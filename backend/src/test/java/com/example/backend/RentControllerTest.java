package com.example.backend;

import com.example.backend.components.rent.controller.RentController;
import com.example.backend.S3Bucket.FileService;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.service.RentService;
import com.example.backend.components.reviews.service.ReviewService;
import com.example.backend.components.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RentController.class)
public class RentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RentService rentService;

    @MockBean
    private FileService fileService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private ReviewService reviewService;


    @Test
    public void testGetAllRents() throws Exception {
        List<Rent> rents = List.of(new Rent());
        Mockito.when(rentService.getAvailableRents(null)).thenReturn(rents);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/getAllRents")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }
}
