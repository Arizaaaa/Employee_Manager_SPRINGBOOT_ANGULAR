package prueba.spring.employeemanager.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import prueba.spring.employeemanager.model.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long>{

    Optional<Employee> findEmployeeById(Long id);
}
