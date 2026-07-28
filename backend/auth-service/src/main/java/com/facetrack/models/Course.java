package com.facetrack.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "courses")
public class Course extends BaseEntity {

	@Column(nullable = false, unique = true, length = 100)
	private String name;

}
