package com.ar.springboot.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ar.springboot.backend.apirest.models.entity.Cliente;
import com.ar.springboot.backend.apirest.models.services.IClienteService;

//CORS, permitir al domino de Angular acceder a todos los metodos del servicio REST.
@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/api") //endpoint
public class ClienteRestController {
	
	//Busca el primer candidato, una clase concreta que implemente la intefaz IClienteService (en este clase la clase es ClienteServiceImpl)
	//En caso de existir dos clases que implmenten la interfaz IClienteService, usar un Qualifier
	@Autowired
	private IClienteService clienteService;
	
	@GetMapping("/clientes")
	public List<Cliente> index(){
		return clienteService.findAll();
	}
}
