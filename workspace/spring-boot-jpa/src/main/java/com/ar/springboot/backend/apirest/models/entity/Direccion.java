package com.ar.springboot.backend.apirest.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="DIRECCION")
public class Direccion implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="ID_DIRECCION")
	private Long id;
	@Column(name="CALLE")
	private String calle;
	@Column(name="ZONA")
	private String zona;
	@Column(name="NUMERO_CASA")
	private Long numeroCasa;
	@Column(name="PAIS")
	private String pais;
	
	//Relacion - Bidireccion
	//Bidireccional, se puede ir desde Empleado a Direccion y viceversa.
	//Direccion no es dueno de la relacion
	//"direccion" es atributo de la entidad Empleado
	@OneToOne(mappedBy = "direccion", fetch = FetchType.LAZY)
	private Empleado empleado;
	
	
		
	public Direccion(Long id, String calle, String zona, Long numeroCasa, String pais) {
		this.id = id;
		this.calle = calle;
		this.zona = zona;
		this.numeroCasa = numeroCasa;
		this.pais = pais;
	}
	public Direccion() {
		
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCalle() {
		return calle;
	}
	public void setCalle(String calle) {
		this.calle = calle;
	}
	public String getZona() {
		return zona;
	}
	public void setZona(String zona) {
		this.zona = zona;
	}
	public Long getNumeroCasa() {
		return numeroCasa;
	}
	public void setNumeroCasa(Long numeroCasa) {
		this.numeroCasa = numeroCasa;
	}
	public String getPais() {
		return pais;
	}
	public void setPais(String pais) {
		this.pais = pais;
	}
	
	
	public Empleado getEmpleado() {
		return empleado;
	}
	public void setEmpleado(Empleado empleado) {
		this.empleado = empleado;
	}
	@Override
	public String toString() {
		return "Direccion [id=" + id + ", calle=" + calle + ", zona=" + zona + ", numeroCasa=" + numeroCasa + ", pais="
				+ pais + ", empleado=" + empleado.getCodigo() + "]";
	}
	
	
	
	
	
}
