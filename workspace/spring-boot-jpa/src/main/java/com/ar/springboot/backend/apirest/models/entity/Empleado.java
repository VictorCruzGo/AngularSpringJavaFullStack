package com.ar.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="EMPLEADO")
public class Empleado implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="COD_EMPLEADO")
	private Long codigo;
	@Column(name="NOMBRE")
	private String nombre;
	@Column(name="APELLIDO")
	private String apellido;
	@Column(name="FECHA_NACIMIENTO")
	private Date fecha;
	
	//Relacion OneToOne - Unidireccional.
	//Apartir de Empleado se obtiene los datos de la Direccion
	//Una de las entidades tiene que ser la duena
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) 
	@JoinColumn(name="ID_DIRECCION") //Se creara el campo ID_DIRECCION en la tabla EMPLEADO//EMPLEADO es la duena de la relacion
	private Direccion direccion;
	
	public Empleado() {
		
	}

	public Empleado(Long codigo, String nombre, String apellido, Date fecha) {	
		this.codigo = codigo;
		this.nombre = nombre;
		this.apellido = apellido;
		this.fecha = fecha;
	}

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	
	
	public Direccion getDireccion() {
		return direccion;
	}

	public void setDireccion(Direccion direccion) {
		this.direccion = direccion;
	}

	@Override
	public String toString() {
		return "Empleado [codigo=" + codigo + ", nombre=" + nombre + ", apellido=" + apellido + ", fecha=" + fecha
				+ ", direccion=" + direccion + "]";
	}

			
	
	
}
