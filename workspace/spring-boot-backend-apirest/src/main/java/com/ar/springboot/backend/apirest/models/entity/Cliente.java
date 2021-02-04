package com.ar.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;


//Convertir en una clase de persistencia mapeado a una tabla
//Serializable, la clase se puede guardar dentro de los atributos de la sesion.
@Entity
@Table(name="cliente")
public class Cliente implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	
	//@Column,se puede omitir si el campo tiene el mismo nombre del atributo
	//javax.validation.constraint para versiones superior 2 de spring boot	
	@NotEmpty(message="No puede estar vacio") 
	@Size(min=4, max=12, message="El tamano tiene que estar entre 4 y 12 caracteres")
	@Column(nullable = false)
	private String nombre;
	
	@NotEmpty(message="No puede estar vacio")
	private String apellido;
	
	@NotEmpty(message="No puede estar vacio")
	@Email(message="No es una direccion de correo valido")
	@Column(nullable=false, unique = false)
	private String email;
	
	@Column(name="create_at")
	@Temporal(TemporalType.DATE)//Transforma la Data de Java a Date de Mysql
	private Date createAt;
	
	//Antes de que se haga un save o persist incluir la fecha en el atribuo createAt
	@PrePersist
	public void prePersist() {
		createAt=new Date();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

}
