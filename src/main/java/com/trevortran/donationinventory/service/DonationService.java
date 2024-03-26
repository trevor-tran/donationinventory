package com.trevortran.donationinventory.service;

import com.trevortran.donationinventory.model.Donation;

import java.util.List;
import java.util.UUID;

public interface DonationService {

    /**
     * Get all donations
     * @return list of donations
     */
    List<Donation> getAll();

    /**
     * Persist a new Donation if Donation's ID does not exist in the database.
     * Or update the existing Donation.
     *
     * @param donation
     * @return created/updated Donation
     */
    Donation save(Donation donation);
    void delete(UUID donationId);
}
