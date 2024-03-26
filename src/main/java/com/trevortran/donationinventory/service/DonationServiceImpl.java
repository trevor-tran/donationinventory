package com.trevortran.donationinventory.service;

import com.trevortran.donationinventory.model.Donation;
import com.trevortran.donationinventory.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class DonationServiceImpl implements DonationService{

    private final DonationRepository donationRepository;

    @Autowired
    public DonationServiceImpl(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    @Override
    public List<Donation> getAll() {
        return donationRepository.findAll();
    }

    @Override
    @Transactional
    public Donation save(Donation donation) {
        return donationRepository.save(donation);
    }

    @Override
    @Transactional
    public void delete(UUID donationId) {
        donationRepository.deleteById(donationId);
    }
}
