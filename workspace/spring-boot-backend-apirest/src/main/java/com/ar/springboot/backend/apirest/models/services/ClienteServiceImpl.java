package com.ar.springboot.backend.apirest.models.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ar.springboot.backend.apirest.models.dao.IClienteDao;
import com.ar.springboot.backend.apirest.models.dao.IFacturaDao;
import com.ar.springboot.backend.apirest.models.dao.IProductoDao;
import com.ar.springboot.backend.apirest.models.entity.Cliente;
import com.ar.springboot.backend.apirest.models.entity.Factura;
import com.ar.springboot.backend.apirest.models.entity.Producto;
import com.ar.springboot.backend.apirest.models.entity.Region;

//@Service, marca la clase como un componenete de servicio en spring. Tambien se guarda en el contenedor de spring.	
@Service
public class ClienteServiceImpl implements IClienteService {

	//Inyectar Daos - ClienteDao
	@Autowired
	private IClienteDao clienteDao;
	@Autowired
	private IFacturaDao facturaDao;
	@Autowired
	private IProductoDao productoDao;
	
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
	
	@Override
	@Transactional(readOnly = true)
	public Page<Cliente> findAll(Pageable pageable) {
		return clienteDao.findAll(pageable);
	}

	@Override
	@Transactional(readOnly=true)
	public Cliente findById(Long id) {
		return clienteDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Cliente save(Cliente cliente) {
		return clienteDao.save(cliente);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		clienteDao.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Region> findAllRegiones() {		
		return clienteDao.findAllRegiones();
	}

	@Override
	@Transactional(readOnly = true)
	public Factura findFacturaById(Long id) {
		return facturaDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Factura saveFactura(Factura factura) {
		return facturaDao.save(factura);
	}

	@Override
	@Transactional
	public void deleteFacturaByid(Long id) {
		facturaDao.deleteById(id);
		
	}

	@Override
	@Transactional(readOnly = true)
	public List<Producto> findProductoByNombre(String term) {
		return productoDao.findByNombre(term);
		//return productoDao.findByNombreContainingIgnoreCase(term);
	}	
}
