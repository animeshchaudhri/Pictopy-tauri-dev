import AIGallery from "@/components/AITagging/AIgallery";
import { LoadingScreen } from "@/components/ui/LoadingScreen/LoadingScreen";

import useAIImage from "@/hooks/AI_Image";

const AITagging: React.FC = () => {
  const { images, loading } = useAIImage("tagged-images");

  if (loading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div>
      <AIGallery mediaItems={images} title="Tagged images" type="image" />
    </div>
  );
};

export default AITagging;
