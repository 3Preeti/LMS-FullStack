package com.lms.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "status_history")
public class StatusHistory {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long historyId;

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private Request request;

    @Column(name = "old_status")
    private String oldStatus;

    @Column(name = "new_status", nullable = false)
    private String newStatus;

    @Column(name = "changed_at")
    private LocalDateTime changedAt;

    // Constructors
    public StatusHistory() {}

    // Getters & Setters
    public Long getHistoryId() {
        return historyId;
    }
    public void setHistoryId(Long historyId) {
        this.historyId = historyId;
    }
    public Request getRequest() {
        return request;
    }
    
    public void setRequest(Request request) {
        this.request = request;
    }

    public String getOldStatus() {
        return oldStatus;
    }
    
    public void setOldStatus(String oldStatus) {
        this.oldStatus = oldStatus;
    }

    public String getNewStatus() {
        return newStatus;
    }
    
    public void setNewStatus(String newStatus) {
        this.newStatus = newStatus;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }
    
    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }
}

