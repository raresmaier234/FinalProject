package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class BackendApplication {

	public static void main(String[] args) {
		System.out.print("da");
		SpringApplication.run(BackendApplication.class, args);
	}

}
