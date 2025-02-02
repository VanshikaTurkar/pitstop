import React, { useState } from 'react';
import { Send, Globe, AlertTriangle, GasPump, Map, BadgeAlert } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ReportInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [report, setReport] = useState('');
  const [language, setLanguage] = useState('en');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const categories = {
    road: { label: 'Road Conditions', icon: Map },
    restroom: { label: 'Restroom Cleanliness', icon: AlertTriangle },
    safety: { label: 'Safety Concerns', icon: BadgeAlert },
    gas: { label: 'Gas Prices', icon: GasPump }
  };

  // Simulated language options (in production, you'd want to use a proper i18n library)
  const languages = {
    en: {
      title: 'Submit Report',
      placeholder: 'Enter your report details...',
      submit: 'Submit',
      success: 'Report submitted successfully!'
    },
    es: {
      title: 'Enviar Informe',
      placeholder: 'Ingrese los detalles de su informe...',
      submit: 'Enviar',
      success: '¡Informe enviado con éxito!'
    },
    fr: {
      title: 'Soumettre un Rapport',
      placeholder: 'Entrez les détails de votre rapport...',
      submit: 'Soumettre',
      success: 'Rapport soumis avec succès!'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the report to your backend
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
    setReport('');
    setSelectedCategory('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{languages[language].title}</h2>
        <select
          className="p-2 border rounded-md"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.entries(categories).map(([key, { label, icon: Icon }]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors
              ${selectedCategory === key 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <Icon size={24} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={report}
          onChange={(e) => setReport(e.target.value)}
          placeholder={languages[language].placeholder}
          className="w-full h-32 p-3 border rounded-lg resize-none"
          required
        />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
          disabled={!selectedCategory || !report}
        >
          <Send size={18} />
          {languages[language].submit}
        </button>
      </form>

      {showConfirmation && (
        <Alert className="mt-4 bg-green-100">
          <AlertDescription className="text-green-800">
            {languages[language].success}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ReportInterface;
