package prueba.spring.employeemanager.model;

import java.io.Serializable;

import jakarta.persistence.*;

@Entity
public class Employee implements Serializable {
	
	@jakarta.persistence.Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable = false, updatable = false)
	private Long id;
	private String name;
	private String email;
	private String jobTitle;
	private String phone;
	private String imageUrl;
	@Column(nullable = false, updatable = false)
	private String employeeCode;

	public Employee() {}

	public Employee(String name, String email, String jobTitle, String phone, String imageUrl, String employeeCode) {
		this.name = name;
		this.email = email;
		this.jobTitle = jobTitle;
		this.phone = phone;
		this.imageUrl = imageUrl;
		this.employeeCode = employeeCode;
		
	}

	public void setId(Long id) { this.id = id; }
	public void setName(String name) { this.name = name; }
	public void setEmail(String email) { this.email = email; }
	public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
	public void setPhone(String phone) { this.phone = phone; }
	public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
	public void setEmployeeCode(String employeeCode) { this.employeeCode = employeeCode; }

	public Long getId() { return this.id; }
	public String getName() { return this.name; }
	public String getEmail() { return this.email; }
	public String getJobTitle() { return this.jobTitle; }
	public String getPhone() { return this.phone; }
	public String getImageUrl() { return this.imageUrl; }
	public String getEmployeeCode() { return this.employeeCode; }

	@Override
	public String toString() {
		return "Employee{" +
		"id=" + this.id + 
		", name='" + this.name + '\'' +
		", email='" + this.email + '\'' +
		", jobTitle='" + this.jobTitle + '\'' +
		", phone='" + this.phone + '\'' +
		", imageUrl='" + this.imageUrl + '\'' +
		"}"; 
	}
}
