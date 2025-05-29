interface ActivityEmbedProps {
  embedUrl: string;
}

const ActivityEmbed = ({ embedUrl }: ActivityEmbedProps) => {
  return (
    <div className="aspect-[4/3] w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <iframe 
        src={embedUrl}
        className="w-full h-full"
        allowFullScreen
        style={{ border: 0 }}
      />
    </div>
  );
};

export default ActivityEmbed;