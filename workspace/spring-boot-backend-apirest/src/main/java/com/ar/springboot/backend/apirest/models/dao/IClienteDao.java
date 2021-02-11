package com.ar.springboot.backend.apirest.models.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.ar.springboot.backend.apirest.models.entity.Cliente;
import com.ar.springboot.backend.apirest.models.entity.Region;

//Clase DAO implmentado utilizando CrudRepository
//public interface IClienteDao extends CrudRepository<Cliente, Long> {
public interface IClienteDao extends JpaRepository<Cliente, Long> {
	//Se podria agregar un metodo o crear un nuevo DAO para regiones.
	//Como solo hay una sola consulta para la region, entonces agregar al DAO cliente.
	//En caso de hacer un crud para la region crear un numero DAO region
	//El Query hacer referencias a objetos
	@Query("from Region")
	public List<Region> findAllRegiones();
}
