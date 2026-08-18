<?php

    namespace App\Modules\News;

    use App\Modules\News\NewsRepository;

    class NewsService {
        private $newsRepository;
        public function __construct(NewsRepository $newsRepository) {
            $this->newsRepository = $newsRepository;
        }
        public function getPublicNews() {
            return $this->newsRepository->getActiveNews();
        }
    }
?>