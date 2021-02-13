package com.ar.springboot.backend.apirest.models.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="LIBROS")
public class Libro {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="LIBRO_ID")
	private Long id;
	@Column(name="TITULO")
	private String titulo;	
	
	@ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.LAZY) //Muchos libros van a corresponderle a un autor//@ManyToOne por defecto el fetch EAGER
	@JoinColumn(name="AUTOR_ID")
	private Autor autor; //El autor ha escrito un determinado libro
	

	public Libro(Long id, String titulo, Autor autor) {
		this.id = id;
		this.titulo = titulo;
		this.autor = autor;
	}
		
	public Libro() {

	}

	public Autor getAutor() {
		return autor;
	}
	public void setAutor(Autor autor) {
		this.autor = autor;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	@Override
	public String toString() {
		return "Libro [id=" + id + ", titulo=" + titulo + ", autor=" + autor.getNombre() + "]";
	}


	
	
	
}
