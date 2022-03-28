package com.example.projectlaminam.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "pack")
public class Pack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "pack", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Card> cards = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(     name = "user_package",
            joinColumns = { @JoinColumn(name = "package_id")},
            inverseJoinColumns = { @JoinColumn(name = "user_id")}
    )
    private Set<User> users = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Pack{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cards=" + cards +
                ", users=" + users +
                '}';
    }
}
