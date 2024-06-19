// // // import { Card, CardContent } from "../ui/card";
// // import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

// // // export function CarouselSize() {

// // //   return (
// // //     <Carousel
// // //       opts={{
// // //         align: "start",
// // //       }}
// // //       className="w-full max-w-sm"
// // //     >
// // //       <CarouselContent>
// // //         {images.map((image, index) => (
// // //           <CarouselItem key={index}>
// // //             <div className="p-1">
// // //               <Card className="rounded">
// // //                 {/* <CardContent className="flex  items-center justify-center p-6"> */}
// // //                 <img src={image.original} alt={`Image ${index + 1}`} />
// // //                 {/* </CardContent> */}
// // //               </Card>
// // //             </div>
// // //           </CarouselItem>
// // //         ))}
// // //       </CarouselContent>
// // //     </Carousel>
// // //   );
// // // }

// // // export default CarouselSize;

// // export function Carousel2() {
// //   const images = [
// //     {
// //       original: "https://picsum.photos/id/1015/1000/600/",
// //       thumbnail: "https://picsum.photos/id/1018/250/150/",
// //     },
// //     {
// //       original: "https://picsum.photos/id/1015/1000/600/",
// //       thumbnail: "https://picsum.photos/id/1015/250/150/",
// //     },
// //     {
// //       original: "https://picsum.photos/id/1019/1000/600/",
// //       thumbnail: "https://picsum.photos/id/1019/250/150/",
// //     },
// //   ];
// //   return (
// //     <div className="w-full max-w-md mx-auto">
// //       <Carousel className="rounded-lg overflow-hidden">
// //         <CarouselContent>
// //           <CarouselItem>
// //             <img
// //               src={images[2].original}
// //               alt="Carousel Image 1"
// //               width={600}
// //               height={400}
// //               className="object-cover w-full aspect-[3/2]"
// //             />
// //           </CarouselItem>
// //           <CarouselItem>
// //             <img
// //               src={images[0].original}
// //               alt="Carousel Image 2"
// //               width={600}
// //               height={400}
// //               className="object-cover w-full aspect-[3/2]"
// //             />
// //           </CarouselItem>
// //           <CarouselItem>
// //             <img
// //               src={images[1].original}
// //               alt="Carousel Image 3"
// //               width={600}
// //               height={400}
// //               className="object-cover w-full aspect-[3/2]"
// //             />
// //           </CarouselItem>
// //         </CarouselContent>
// //       </Carousel>
// //     </div>
// //   );
// // }
// // export default Carousel2;

// import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

// export function Carousel2() {
//   return (
//     <div className="w-full max-w-6xl mx-auto ">
//       <Carousel className="w-full">
//         <CarouselContent className="flex gap-4 rounded-md">
//           <CarouselItem className=" md:basis-1/3 lg:basis-1/4 rounded-md">
//             <img
//               src={images[0].original}
//               alt="Carousel Image"
//               width={600}
//               height={400}
//               className="w-full h-40 object-cover rounded-lg"
//             />
//           </CarouselItem>
//           <CarouselItem className=" md:basis-1/3 lg:basis-1/4 rounded-md">
//             <img
//               src={images[0].original}
//               alt="Carousel Image"
//               width={600}
//               height={400}
//               className="w-full h-40 object-cover rounded-md"
//             />
//           </CarouselItem>
//           <CarouselItem className=" md:basis-1/3 lg:basis-1/4 rounded-md">
//             <img
//               src={images[0].original}
//               alt="Carousel Image"
//               width={600}
//               height={400}
//               className="w-full h-40 object-cover rounded-md"
//             />
//           </CarouselItem>
//           <CarouselItem className=" md:basis-1/3 lg:basis-1/4 rounded-md">
//             <img
//               src={images[0].original}
//               alt="Carousel Image"
//               width={600}
//               height={400}
//               className="w-full h-40 object-cover rounded-md"
//             />
//           </CarouselItem>
//         </CarouselContent>
//       </Carousel>
//     </div>
//   );
// }

// export default Carousel2;
