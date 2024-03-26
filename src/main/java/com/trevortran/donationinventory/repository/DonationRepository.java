package com.trevortran.donationinventory.repository;

import com.trevortran.donationinventory.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DonationRepository extends JpaRepository<Donation, UUID> {
}
