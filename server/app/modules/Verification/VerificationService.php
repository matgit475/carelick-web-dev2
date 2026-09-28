<?php
    namespace App\Modules\Verification;

    use App\Shared\Exception\ForbiddenException;
    use App\Modules\Verification\VerificationRepository;

    class VerificationService {
        private $verificationRepository;

        public function __construct(VerificationRepository $verificationRepository) {
            $this->verificationRepository = $verificationRepository;
        }

        public function getRequests() {
            return $this->verificationRepository->getRequests();
        }

        public function acceptRequest($id) {
            return $this->verificationRepository->acceptRequest($id);
        }
        public function declineRequest($id) {
            return $this->verificationRepository->declineRequest($id);
        }
    }
?>