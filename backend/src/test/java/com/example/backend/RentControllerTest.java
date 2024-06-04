package com.example.backend;

import com.example.backend.components.rent.repository.RentRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class RentIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RentRepository rentRepository;

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
        mockMvc.perform(get("/api/getAllRents"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect((ResultMatcher) jsonPath("$[0].name", is("Test Rent")));
    }

    @Test
    public void testUpdateRent() throws Exception {
        mockMvc.perform(post("/api/editRent/1152")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Updated Test Rent\", \"description\": \"Updated description\", \"price\": 200}")) // adjust with actual fields
                .andExpect(status().isOk())
                .andExpect((ResultMatcher) jsonPath("$.name", is("Updated Test Rent")));
    }

    @Test
    public void testDeleteRent() throws Exception {
        // Again, assuming rent ID is known or fetched
        mockMvc.perform(post("/api/deleteRent/1"))
                .andExpect(status().isOk());
    }

    @AfterEach
    public void cleanUp() {
        rentRepository.deleteAll();
    }
}
