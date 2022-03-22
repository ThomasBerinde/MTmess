package com.project.MTmess;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.UnknownHostException;

@SpringBootApplication
public class MTmessApplication {

	public static void main(String[] args) {
		SpringApplication.run(MTmessApplication.class, args);


	/*	TO-DO

		Don't forget to redirect the frontend proxy to the hosted location of the backend server.

		Implement username or email already exists ( outside the User function, before creating an user object ).

		Implement CRUD operation to find by hashcode (when logging in) (how tf will I do this??)  ( Answer : use native sql queries. )
		Implement sql query to update a row ( when adding a new friend or sending a new message) .
	 */

} }
