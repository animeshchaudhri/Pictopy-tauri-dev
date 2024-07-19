import AIGallery from "@/components/AITagging/AIgallery";

import useAIImage from "@/hooks/AI_Image";

const AITagging: React.FC = () => {
  const { images, loading } = useAIImage("tagged-images");

  if (loading) {
    return <div>Loading images...</div>;
  }

  return (
    <div>
      <AIGallery images={images} title={"Tagged Images"} />
    </div>
  );
};

export default AITagging;
