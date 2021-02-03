package com.ar.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ar.springboot.backend.apirest.models.entity.Cliente;

//Interfaz del services
//Metodos del Crud
public interface IClienteService {
	public List<Cliente> findAll();
	public Page<Cliente> findAll(Pageable pageable);
	public Cliente findById(Long id);
	public Cliente save(Cliente cliente);
	public void delete(Long id);
}
