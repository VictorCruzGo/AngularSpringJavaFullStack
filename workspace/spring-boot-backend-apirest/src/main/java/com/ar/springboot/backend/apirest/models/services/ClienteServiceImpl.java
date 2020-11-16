package com.ar.springboot.backend.apirest.models.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ar.springboot.backend.apirest.models.dao.IClienteDao;
import com.ar.springboot.backend.apirest.models.entity.Cliente;

//@Service, marca la clase como un componenete de servicio en spring. Tambien se guarda en el contenedor de spring.	
@Service
public class ClienteServiceImpl implements IClienteService {

	//Inyectar Daos - ClienteDao
	@Autowired
	private IClienteDao clienteDao;
	
	//@Transactional, permite manejar transaccion.
	//Los metodos del CrudRepository ya vienen con transaccionalidad
	//Se podria omitir la anotacion @Transaccional
	//Usar la transaccionalidad en el Service sobreescribre CrudRespository y lo hace mas explicita
	//Para los metodos nuevos del Dao adgregar @Transactional
	@Override
	@Transactional(readOnly = true)
	public List<Cliente> findAll() {
		return (List<Cliente>) clienteDao.findAll();
	}
}
