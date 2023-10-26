package com.ChronoChords.ChronoChords.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class user {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;
	
	public user() {
	
    }
    public user(String email, String password) {
        super();
        this.password = password;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getEmail(){
        return email;
    }
    
    public void setEmail(String email){
        this.email = email;
    }
}


