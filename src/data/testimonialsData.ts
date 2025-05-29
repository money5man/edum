export interface TestimonialData {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
  rating: number;
  childAge?: string;
  location?: string;
}

const testimonialsData: TestimonialData[] = [
  {
    id: 1,
    name: "Jennifer Simmons",
    role: "Parent",
    content: "KidsGeniusLab has completely transformed how my son approaches learning. The math games specifically have helped him improve his skills and confidence. He now asks to practice math instead of me having to encourage him!",
    avatarUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    childAge: "8 years old",
    location: "Chicago, IL"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Elementary Teacher",
    content: "As a 3rd grade teacher, I've incorporated KidsGeniusLab into our classroom routine. The variety of educational games keeps my students engaged while reinforcing curriculum concepts. It's been a wonderful teaching aid!",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    location: "Portland, OR"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Parent",
    content: "My daughter struggled with reading comprehension, but after using the Word Explorer game regularly, she's shown remarkable improvement. The app makes learning feel like play, which is exactly what I was looking for.",
    avatarUrl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4,
    childAge: "7 years old",
    location: "Atlanta, GA"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Educational Consultant",
    content: "I recommend KidsGeniusLab to all the families I work with. The platform's approach to gamified learning is research-based and effective. The progress tracking features are especially valuable for parents to monitor development.",
    avatarUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    location: "Boston, MA"
  },
  {
    id: 5,
    name: "Amanda Lee",
    role: "Parent",
    content: "My twins have different learning styles, but KidsGeniusLab works for both of them. One loves the science games while the other enjoys the language activities. It's rare to find something that engages them both equally!",
    avatarUrl: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    childAge: "6 years old (twins)",
    location: "Seattle, WA"
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "After-School Program Director",
    content: "We implemented KidsGeniusLab in our after-school program, and it's been a hit with both the kids and our staff. The variety of activities keeps everyone interested, and we've seen improvement in academic performance.",
    avatarUrl: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4,
    location: "San Diego, CA"
  }
];

export default testimonialsData;