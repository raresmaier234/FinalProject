package com.example.backend;

import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.model.RentDTO;
import com.example.backend.components.rent.model.RentStatus;
import com.example.backend.components.rent.model.RentType;
import com.example.backend.components.rent.service.RentService;
import com.example.backend.components.reviews.service.ReviewService;
import com.example.backend.components.user.model.User;
import com.example.backend.components.user.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.is;

@SpringBootTest
@AutoConfigureMockMvc
public class RentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RentService rentService;
    @MockBean
    private ReviewService reviewService;
    @MockBean
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        Rent rent = new Rent();
        User user = userRepository.findByEmail("raresmaier123@gmail.com");

        rent.setId(1);
        rent.setName("Test Rent");
        rent.setUser(user);
        rent.setPhotoUrls(Collections.singletonList("https://traveler-store.s3.amazonaws.com/084cb2ca-0c11-4aaa-841d-db462af5cae4-cabana.jpeg"));
        rent.setEndDate(LocalDate.parse("2024-05-24"));
        rent.setStartDate(LocalDate.parse("2024-05-31"));
        rent.setHasParking(true);
        rent.setNrOfRooms(11);
        rent.setNrOfPersons(12);
        rent.setNrOfBathrooms(13);
        rent.setDescription("Cabana test descriere");
        rent.setRentStatus(RentStatus.Available);
        rent.setPrice(100);
        rent.setLocation("Cluj Napoca");
        rent.setType(RentType.valueOf("CABANA"));

        RentDTO rentDTO = new RentDTO();
        rentDTO.setName("Test Rent");
        rentDTO.setDescription("Descriere cabana test");
        rentDTO.setAverageRating(4.50);
        rentDTO.setPhotos(Collections.singletonList("https://traveler-store.s3.amazonaws.com/084cb2ca-0c11-4aaa-841d-db462af5cae4-cabana.jpeg"));
        rentDTO.setNrOfRooms(11);
        rentDTO.setNrOfPersons(12);
        rentDTO.setNrOfBathrooms(13);
        rentDTO.setDescription("Cabana test descriere");
        rentDTO.setPrice(100);
        rentDTO.setLocation("Cluj Napoca");
        rentDTO.setType(RentType.valueOf("CABANA"));

        when(rentService.getAvailableRents(any())).thenReturn(Arrays.asList(rent));
        when(reviewService.getAverageRating(any())).thenReturn(5.0);
    }

    @Test
    public void testAddRent() throws Exception {
        MockMultipartFile photo = new MockMultipartFile("photos", "test.jpg", "image/jpeg", "test image content".getBytes());
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/addRent")
                        .file(photo)
                        .param("user_id", "502")
                        .param("location", "Test Location")
                        .param("price", "100")
                        .param("name", "Test Rent")
                        .param("description", "Test Description")
                        .param("nrOfBathrooms", "1")
                        .param("nrOfPersons", "4")
                        .param("nrOfRooms", "2")
                        .param("hasParking", "true")
                        .param("startDate", "2022-01-01")
                        .param("endDate", "2022-01-15")
                        .param("type", "APARTAMENT")
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isCreated());
    }

    @Test
    public void testGetAllRents() throws Exception {
        mockMvc.perform(post("/api/getAllRents")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is("Test Rent")));
    }


    @AfterEach
    public void cleanUp() {
        for(Rent rent: rentService.getAll()) {
            rentService.deleteRent(rent.getId());
        }
    }
}
