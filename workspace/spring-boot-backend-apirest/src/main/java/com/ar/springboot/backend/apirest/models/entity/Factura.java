package com.ar.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "facturas")
public class Factura implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String descripcion;

	private String observacion;

	@Column(name = "create_at")
	@Temporal(TemporalType.DATE) // Formato
	private Date createAt;

	@ManyToOne(fetch = FetchType.LAZY) // Muchas facturas estan asociadas a un solo cliente
	@JsonIgnoreProperties(value={"hibernateLazyInitializer","handler","facturas"}, allowSetters=true) //allowSetters evita problemas de recursion
	private Cliente cliente;

	/* Bidireccional Factura-ItemFactura */
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "factura", cascade = CascadeType.ALL)
//	@JsonIgnoreProperties({"hibernateLazyInitializer","handler","factura"})
//	private List<ItemFactura> items;

	/* Unidireccinoal Factura-ItemFactura */
	// Es necesario indicar la columna de la tabla ItemFactura
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL )
	@JoinColumn(name="factura_id") //Al indicar la columna @JoinColumn, automaticamente se creara en la tabla 'facturas_items' la columna 'factura_id'
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private List<ItemFactura> items;

	@PrePersist
	public void prePersist() {
		this.createAt = new Date();
	}

	public Factura() {
		this.items = new ArrayList<>();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public List<ItemFactura> getItems() {
		return items;
	}

	public void setItems(List<ItemFactura> items) {
		this.items = items;
	}

	public Double getTotal() {
		Double total = 0.00;
		total = items.stream().mapToDouble(item -> item.getImporte()).sum();

		return total;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	private static final long serialVersionUID = 1L;
}
