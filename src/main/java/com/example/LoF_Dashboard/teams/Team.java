package com.example.LoF_Dashboard.teams;

import jakarta.persistence.*;

@Entity
@Table(name = "TEAMS")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String team;

    public Team(String team) {
        this.team = team;
    }

    public Team() {
        this.team = "team";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }
}
