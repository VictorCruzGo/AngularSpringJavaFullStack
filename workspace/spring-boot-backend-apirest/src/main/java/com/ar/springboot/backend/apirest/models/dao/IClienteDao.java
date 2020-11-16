package com.ar.springboot.backend.apirest.models.dao;
import org.springframework.data.repository.CrudRepository;
import com.ar.springboot.backend.apirest.models.entity.Cliente;

//Clase DAO implmentado utilizando CrudRepository
public interface IClienteDao extends CrudRepository<Cliente, Long> {

}
