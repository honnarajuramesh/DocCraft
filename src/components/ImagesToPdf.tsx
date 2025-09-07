import React, { useState } from 'react';
import { Upload, Download, FileText, Settings, AlertCircle, X, Plus } from 'lucide-react';
import { ApiClient } from '../utils/apiClient';
import { Button } from './ui/Button';

interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  error: string | null;
  success: boolean;
}

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

export const ImagesToPdf: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [pageSize, setPageSize] = useState<'A4' | 'LETTER' | 'LEGAL'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [quality, setQuality] = useState(85);
  const [result, setResult] = useState<Blob | null>(null);
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    error: null,
    success: false,
  });

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newImages: ImageFile[] = [];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp'];

    Array.from(selectedFiles).forEach(file => {
      if (allowedTypes.includes(file.type)) {
        const preview = URL.createObjectURL(file);
        newImages.push({
          file,
          preview,
          id: Math.random().toString(36).substr(2, 9)
        });
      }
    });

    if (newImages.length > 0) {
      setImages(prev => [...prev, ...newImages].slice(0, 50)); // Max 50 images
      setState(prev => ({ ...prev, error: null, success: false }));
      setResult(null);
    } else {
      setState(prev => ({ ...prev, error: 'Please select valid image files (PNG, JPEG, GIF, BMP, WebP)' }));
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      // Clean up object URL
      const removed = prev.find(img => img.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
  };

  const processFiles = async () => {
    if (images.length === 0) {
      setState(prev => ({ ...prev, error: 'Please select at least one image' }));
      return;
    }

    setState(prev => ({ 
      ...prev, 
      isProcessing: true, 
      error: null, 
      progress: 0,
      success: false 
    }));

    try {
      setState(prev => ({ ...prev, progress: 50 }));
      
      const files = images.map(img => img.file);
      const response = await ApiClient.convertImagesToPdf(
        files,
        pageSize,
        orientation,
        quality
      );
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setState(prev => ({ ...prev, progress: 100, success: true }));
        setResult(response.data);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage,
        progress: 0,
        success: false
      }));
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const downloadFile = () => {
    if (result) {
      const url = URL.createObjectURL(result);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted_images.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const reset = () => {
    // Clean up object URLs
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setResult(null);
    setState({
      isProcessing: false,
      progress: 0,
      error: null,
      success: false,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Images to PDF</h2>
        </div>
        <p className="text-gray-400">Combine multiple images into a single PDF document</p>
      </div>

      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
        {images.length === 0 && !result && (
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Select Images to Convert
            </h3>
            <p className="text-gray-400 mb-6">
              Choose PNG, JPEG, GIF, BMP, or WebP images (max 50 files)
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              id="image-input"
            />
            <label
              htmlFor="image-input"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Select Images
            </label>
          </div>
        )}

        {images.length > 0 && !result && (
          <div className="space-y-6">
            {/* Image Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Selected Images ({images.length}/50)
                </h3>
                <div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    id="add-images"
                  />
                  <label
                    htmlFor="add-images"
                    className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add More
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-64 overflow-y-auto">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.preview}
                      alt={image.file.name}
                      className="w-full h-20 object-cover rounded-lg border border-gray-600"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <p className="text-xs text-gray-400 mt-1 truncate" title={image.file.name}>
                      {image.file.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                PDF Settings
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Page Size
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white"
                  >
                    <option value="A4">A4 (210×297mm)</option>
                    <option value="LETTER">Letter (8.5×11")</option>
                    <option value="LEGAL">Legal (8.5×14")</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Orientation
                  </label>
                  <select
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={processFiles}
                disabled={state.isProcessing || images.length === 0}
                loading={state.isProcessing}
                icon={FileText}
                className="flex-1"
              >
                {state.isProcessing ? 'Creating PDF...' : 'Convert to PDF'}
              </Button>
              <Button
                onClick={reset}
                variant="secondary"
                className="px-4"
              >
                Reset
              </Button>
            </div>
          </div>
        )}

        {result && (
          <div className="text-center space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="bg-green-500 p-2 rounded-full">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-green-400">PDF Created!</span>
              </div>
              <p className="text-green-300">
                Your images have been successfully combined into a PDF document
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={downloadFile}
                variant="success"
                icon={Download}
                className="flex-1"
              >
                Download PDF
              </Button>
              <Button
                onClick={reset}
                variant="secondary"
                className="px-4"
              >
                Create Another
              </Button>
            </div>
          </div>
        )}

        {state.error && (
          <div className="mt-6 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{state.error}</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <h4 className="font-semibold text-blue-400 mb-2">Conversion Details</h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-300">
          <div>• Images are automatically scaled to fit pages</div>
          <div>• Maintains aspect ratio with centering</div>
          <div>• Each image becomes a separate PDF page</div>
          <div>• Higher quality = larger file size</div>
        </div>
      </div>
    </div>
  );
};
