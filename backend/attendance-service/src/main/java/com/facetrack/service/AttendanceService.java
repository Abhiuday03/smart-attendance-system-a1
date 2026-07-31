package com.facetrack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.facetrack.client.StudentClient;
import com.facetrack.dto.StudentResponse;
import com.facetrack.entity.Attendance;
import com.facetrack.repository.AttendanceRepository;

@Service
public class AttendanceService {
	private final AttendanceRepository attendanceRepository;
	private final StudentClient studentClient;
	
	public AttendanceService(AttendanceRepository attendanceRepository , StudentClient studentClient) {
		this.attendanceRepository=attendanceRepository;
		this.studentClient=studentClient;
	}
	
	// Create attendance
    public Attendance addAttendance(Attendance attendance) {

        // Check whether student exists
        StudentResponse student = studentClient.getStudentbyId(attendance.getStudentId());

        if (student == null) {
            throw new RuntimeException(
                    "Student not found with id: " + attendance.getStudentId());
        }

        return attendanceRepository.save(attendance);
    }

    // Get all attendance records
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // Get attendance by ID
    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Attendance not found with id: " + id));
    }

    // Update attendance
    public Attendance updateAttendance(Long id, Attendance attendance) {

        Attendance existingAttendance = getAttendanceById(id);

        existingAttendance.setStudentId(attendance.getStudentId());
        existingAttendance.setDate(attendance.getDate());
        existingAttendance.setStatus(attendance.getStatus());

        return attendanceRepository.save(existingAttendance);
    }

    // Delete attendance
    public void deleteAttendance(Long id) {

        Attendance existingAttendance = getAttendanceById(id);

        attendanceRepository.delete(existingAttendance);
    }
	
}
