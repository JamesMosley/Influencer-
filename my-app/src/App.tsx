import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CampaignListPage } from './CampaignList';
import { CampaignDetails } from './CampaignDetails';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CampaignListPage />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
      </Routes>
    </BrowserRouter>
  );
};
