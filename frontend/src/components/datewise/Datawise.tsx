function Datawise() {
  const images = [
    { src: "/placeholder1.svg", alt: "Trip to Ladakh 1", date: "May 15, 2023" },
  ];
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex flex-col gap-6 overflow-y-auto max-h-screen">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-96 group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/50 flex items-end justify-between px-6 py-4">
              <div className="text-white font-medium">{image.date}</div>
              <StarIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Datawise;
function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
