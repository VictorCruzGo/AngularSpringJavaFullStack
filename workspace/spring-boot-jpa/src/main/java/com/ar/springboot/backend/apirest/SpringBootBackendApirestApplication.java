//BootStrap configuracion de arracte
//Controladores, Services, Respositories, DAO tiene que estar en el paquete base(...backend.apirest)
package com.ar.springboot.backend.apirest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootBackendApirestApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootBackendApirestApplication.class, args);
	}

}
