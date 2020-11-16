package com.ar.springboot.backend.apirest.models.services;

import java.util.List;

import com.ar.springboot.backend.apirest.models.entity.Cliente;

//Interfaz del services
//Metodos del Crud
public interface IClienteService {
	public List<Cliente> findAll();
}
