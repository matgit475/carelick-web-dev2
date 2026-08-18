<?php

    namespace App\Modules\Profession;

    use App\Modules\Profession\ProfessionRepository;

    class ProfessionService {
        private $professionRepository;
        public function __construct(ProfessionRepository $professionRepository) {
            $this->professionRepository = $professionRepository;
        }
        public function getProfessions() {
            return $this->professionRepository->getAll("profession");
        }
    }
?>