package com.excelr.controller;


import com.excelr.model.Employee;
import com.excelr.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAll(@RequestHeader("Role") String role,
                                 @RequestHeader("UserId") Long userId) {
        if ("ADMIN".equalsIgnoreCase(role)) {
            return employeeRepository.findAll();
        } else {
            return employeeRepository.findByAddedBy(userId);
        }
    }

    @PostMapping
    public Employee create(@RequestBody Employee emp,
                           @RequestHeader("UserId") Long userId) {
        emp.setAddedBy(userId);
        return employeeRepository.save(emp);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @RequestBody Employee emp,
                                    @RequestHeader("Role") String role) {
        if (!"ADMIN".equalsIgnoreCase(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Only ADMIN can update employees.");
        }

        Employee existing = employeeRepository.findById(id).orElseThrow();
        existing.setName(emp.getName());
        existing.setDepartment(emp.getDepartment());
        existing.setSalary(emp.getSalary());
        existing.setJoiningDate(emp.getJoiningDate());
        return ResponseEntity.ok(employeeRepository.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id,
                                    @RequestHeader("Role") String role) {
        if (!"ADMIN".equalsIgnoreCase(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Only ADMIN can delete employees.");
        }
        employeeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
