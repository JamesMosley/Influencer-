import React, { useState } from 'react';
import { Campaign, CampaignStatus } from './types';
import './CampaignDetails.css';
interface CampaignDetail extends Campaign{
  platform: string;
  targetAudience: string;
  instructions: string[];
  requiredDeliverables: string[];
}
const MocK_CAMPAIGN_DETAIL: CampaignDetail = {
    id: '1',
    name: 'Summer Product Launch',
    description: 'Promoting our new eco-friendly swimwear line across social channels.',
    status: 'Active',
    deadline: new Date('2026-07-15'),
    budget: 5000,
    platform: 'Instagram Reels, Facebook, Twitter, TikTok',
    targetAudience: 'Eco-conscious consumers, travelers aged 18-35',
    instructions: [
        'Create engaging short-form videos showcasing the swimwear in action.',
        'Feature the product clearly in the first 3 seconds of the video hook.',
    'Emphasize the 100% recycled ocean plastic material narrative naturally.',
    'Use the approved verbal call-to-action: "Click the link in my bio to find your fit."',
    'Do not display competing apparel brands or visible logos in the background.',
    'Ensure the campaign hashtag #EcoSwimLaunch is included in the video description.',
    'Submit the final video for review at least 48 hours before the campaign deadline.'
    ],
    requiredDeliverables: [
    '1x Instagram Reel (9:16 format, min 15s)',
    '1x TikTok Video matching the Reel creative',
    'Primary link inclusion in social bios for 48 hours post-launch',
    'Campaign performance report with engagement metrics and audience insights within 7 days after campaign end',
    'Creative assets (product images, logo, campaign hashtag) provided for content creation',
]

};
const statusClassMap: Record<CampaignStatus, string> = {
  Active: 'status-pill status-active',
  Paused: 'status-pill status-paused',
  Completed: 'status-pill status-completed',
};
const fmtBudget = (n: number) => '$' + n.toLocaleString();
const fmtDate = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
export const CampaignDetails: React.FC = () => {
    const [campaign] = useState<CampaignDetail>(MK_CAMPAIGN_DETAIL);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [submissionNote, setSubmissionNote] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
};
// Simple file handler simulation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) return;
    
    // Simulate API push
    setIsSubmitted(true);
  };

  return (
    <div className="campaign-page">
      <div className="campaign-shell">
        
        {/* Navigation Breadcrumb / Back Indicator */}
        <div className="details-navigation">
          <button className="back-link" onClick={() => window.history.back()}>
            ← Back to Campaign Portfolio
          </button>
        </div>

        {/* Hero Header Section */}
        <header className="details-hero">
          <div className="hero-main-info">
            <div className="hero-meta-row">
              <span className={statusClassMap[campaign.status]}>{campaign.status}</span>
              <span className="meta-divider">•</span>
              <span className="hero-platform-tag">{campaign.platform}</span>
            </div>
            <h1 className="details-title">{campaign.name}</h1>
            <p className="details-lead">{campaign.description}</p>
          </div>

          <div className="details-quick-specs">
            <div className="spec-item">
              <span className="spec-label">Allocated Budget</span>
              <span className="spec-value text-accent">{fmtBudget(campaign.budget)}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Delivery Target</span>
              <span className="spec-value">{fmtDate(campaign.deadline)}</span>
            </div>
          </div>
        </header>

        {/* Two-Column Structured Presentation Layout */}
        <div className="details-grid-layout">
          
          {/* Left Column: Guidelines and Constraints */}
          <main className="details-main-content">
            <section className="content-block">
              <h2 className="section-heading">Strategic Context</h2>
              <div className="context-card">
                <p><strong>Primary Audience:</strong> {campaign.targetAudience}</p>
              </div>
            </section>

            <section className="content-block">
              <h2 className="section-heading">Creative Instructions</h2>
              <ul className="instruction-list">
                {campaign.instructions.map((step, idx) => (
                  <li key={idx} className="instruction-item">
                    <span className="step-number">0{idx + 1}</span>
                    <p className="step-text">{step}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="content-block">
              <h2 className="section-heading">Required Deliverables</h2>
              <div className="deliverables-box">
                {campaign.requiredDeliverables.map((item, idx) => (
                  <div key={idx} className="deliverable-row">
                    <input type="checkbox" readOnly checked disabled className="deliverable-check" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Right Column: Submission Management Portal */}
          <aside className="details-sidebar">
            <div className="submission-card">
              <h3 className="submission-card-title">Assets Submission Portal</h3>
              <p className="submission-card-subtitle">
                Upload final creative files and pacing links for review.
              </p>

              {isSubmitted ? (
                <div className="submission-success">
                  <div className="success-icon">✓</div>
                  <h4>Assets Uploaded Successfully</h4>
                  <p className="success-text">
                    Your deliverables are logged under queue ID <strong>#CM-{campaign.id}</strong>. Review stakeholders have been notified.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="btn-secondary-outline">
                    Update Submission Files
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="submission-form">
                  {/* File Upload Zone */}
                  <div className="upload-dropzone">
                    <input 
                      type="file" 
                      id="file-uploader" 
                      multiple 
                      className="hidden-file-input" 
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-uploader" className="upload-label">
                      <span className="upload-icon">⇪</span>
                      <span className="upload-prompt">Click to browse or drop assets</span>
                      <span className="upload-formats">MP4, MOV, or JPG (Max 500MB total)</span>
                    </label>
                  </div>

                  {/* Uploaded Files Queue View */}
                  {uploadedFiles.length > 0 && (
                    <div className="file-preview-list">
                      <p className="queue-label">Staged Files ({uploadedFiles.length})</p>
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className="file-row">
                          <span className="file-name">📎 {f.name}</span>
                          <span className="file-size">{(f.size / (1024 * 1024)).toFixed(1)} MB</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Strategic Notes */}
                  <div className="form-group">
                    <label htmlFor="notes" className="form-label">Submission Context Notes (Optional)</label>
                    <textarea 
                      id="notes"
                      rows={3}
                      className="form-input"
                      placeholder="Add draft links, content scheduling notes, or contextual tags here..."
                      value={submissionNotes}
                      onChange={(e) => setSubmissionNotes(e.target.value)}
                    />
                  </div>

                  {/* Submission Submission State Button */}
                  <button 
                    type="submit" 
                    className="btn-primary-action"
                    disabled={uploadedFiles.length === 0}
                  >
                    Lock Deliverables & Notify Reviewers
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
};