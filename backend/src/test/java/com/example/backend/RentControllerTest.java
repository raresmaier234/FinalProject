package com.example.backend;

import com.example.backend.components.rent.controller.RentController;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.model.RentDTO;
import com.example.backend.components.rent.service.RentService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(RentController.class)
public class RentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RentService rentService;

    @Test
    public void testGetAllRents() throws Exception {
        List<Rent> rents = Arrays.asList(new Rent());
        Mockito.when(rentService.getAvailableRents(null)).thenReturn(rents);

        mockMvc.perform(post("/api/getAllRents")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }
}