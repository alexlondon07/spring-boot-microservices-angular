package com.microservices.answerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@EnableEurekaClient
@SpringBootApplication
public class AnswerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnswerServiceApplication.class, args);
	}

}
