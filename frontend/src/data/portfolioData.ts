export interface ProjectProcessStep {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  galleryImages?: string[];
  description: string;
  fullDetails?: {
    overview: string;
    highlights: string[];
    techStack: string[];
    githubUrl?: string;
    process?: ProjectProcessStep[];
  };
  tags: string[];
  githubUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
  tags: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Mohammed Ajmal N",
    shortName: "Aj",
    title: "AI Engineer",
    roles: [
      "AI Engineer",
      "Healthcare AI Specialist",
      "Machine Learning Practitioner",
      "Full Stack Developer"
    ],
    greeting: "Hello, I'm",
    headline: "Crafting intelligent solutions at the intersection of AI, Healthcare, and Innovation",
    avatar: "/images/favicon.jpg",
    location: "Malappuram, Kerala, India",
    status: "Available for projects & full-time roles",
    email: "mohammedajmal727@gmail.com",
    phone: "+91 7034689012",
    cvPath: "/files/AjmalN.pdf",
    stats: [
      { number: "1+", label: "Years Experience" },
      { number: "5+", label: "Projects Completed" },
      { number: "15+", label: "Technologies" }
    ],
    social: {
      github: "https://github.com/Ajmal-6",
      linkedin: "http://linkedin.com/in/mohammed-ajmal-n-725649321",
      instagram: "https://instagram.com/__._aj_"
    }
  },
  about: {
    paragraphs: [
      "I'm an AI Engineer and B.Tech graduate in Artificial Intelligence and Data Science, passionate about developing impactful, production-grade AI solutions.",
      "Currently at Curanova.AI, I engineer healthcare AI solutions — from preprocessing sensitive clinical datasets to deploying scalable models on Google Cloud Platform (GCP). I specialize in patient data security and optimizing inference performance.",
      "Beyond healthcare, I have engineered autonomous vehicle prototypes with Raspberry Pi, developed deep learning models for automated image colorization, and trained hundreds of students and educators across Kerala as an SSK Fellow."
    ],
    chips: ["AI Engineer", "Healthcare AI", "Full Stack", "Embedded AI"]
  },
  experience: [
    {
      id: "curanova",
      role: "AI Engineer",
      company: "Curanova.AI",
      period: "Feb 2026 — Present",
      points: [
        "Contributing to real-world healthcare AI solutions by working with medical datasets and supporting model development and analysis.",
        "Performing data preprocessing and cleaning using self-developed AI tools, improving data quality and model performance.",
        "Utilizing Google Health models on GCP while securely handling confidential patient data and building scalable data processing workflows."
      ],
      tags: ["Python", "TensorFlow", "GCP", "Healthcare AI", "Data Pipelines"]
    },
    {
      id: "ksum",
      role: "SSK Fellow — STEM Education Initiative",
      company: "Kerala Startup Mission",
      period: "Jun 2025 — Jan 2026",
      points: [
        "Spearheaded innovation initiatives at Palakkad's maker ecosystem, driving technology adoption and organizing hands-on workshops.",
        "Developed and delivered curriculum on emerging technologies including AI, IoT, and robotics to students and teachers across Palakkad district.",
        "Managed maker space with 3D printers and electronics lab equipment, bridging academic learning and real-world implementation."
      ],
      tags: ["AI", "IoT", "Robotics", "Team Coordination", "3D Printing"]
    },
    {
      id: "fsd",
      role: "Full Stack Developer Intern",
      company: "Full Stack Developer Academy",
      period: "Jan 2025",
      points: [
        "Developed responsive and accessible web applications using modern HTML, CSS, JavaScript, and Bootstrap frameworks."
      ],
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
      id: "atharvo",
      role: "Machine Learning Intern",
      company: "ATHARVO",
      period: "Sep 2024",
      points: [
        "Built and evaluated machine learning NLP pipelines for automated spam detection and text classification."
      ],
      tags: ["Python", "Machine Learning", "NLP", "Scikit-Learn"]
    }
  ] as Experience[],
  skills: [
    {
      title: "Programming",
      skills: ["Python", "Java", "C", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"]
    },
    {
      title: "AI / Machine Learning",
      skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "Keras", "Computer Vision", "Deep Learning", "CNNs", "NLP", "Data Preprocessing", "Model Optimization"]
    },
    {
      title: "Cloud & DevOps",
      skills: ["Google Cloud Platform (GCP)", "Google Health Models", "Docker", "Git", "GitHub", "Jupyter", "Power BI"]
    },
    {
      title: "Web & API Frameworks",
      skills: ["FastAPI", "React", "Django", "Flask", "REST APIs", "Vite", "Tailwind CSS"]
    },
    {
      title: "Hardware & IoT",
      skills: ["Raspberry Pi", "Embedded Systems", "Sensors", "Arduino", "Robotics"]
    },
    {
      title: "Professional Skills",
      skills: ["Problem Solving", "Technical Communication", "Team Collaboration", "Strategic Planning", "Project Management"]
    }
  ] as SkillCategory[],
  projects: [
    {
      id: "av",
      title: "Self-Driving Vehicle Prototype",
      subtitle: "Autonomous Navigation with Raspberry Pi & Computer Vision",
      year: "2025",
      image: "/images/self-driving.png",
      galleryImages: ["/images/ai1.jpg", "/images/ai2.jpg", "/images/ai3.jpg"],
      description: "Built a self-navigating vehicle prototype using Raspberry Pi, computer vision, and sensor fusion. Implemented obstacle detection, lane following, and path planning algorithms.",
      tags: ["Python", "CNN", "Raspberry Pi", "OpenCV", "TensorFlow", "Embedded AI"],
      githubUrl: "https://github.com/Ajmal-6/Automatic-vehicle-using-Raspberry-pi-",
      fullDetails: {
        overview: "An autonomous miniature vehicle designed and programmed from scratch using a Raspberry Pi controller, camera module, and ultrasonic sensors to perform real-time lane tracking, obstacle evasion, and safe maneuvering.",
        highlights: [
          "Developed custom OpenCV pipeline for dynamic edge detection and adaptive lane boundary calculation.",
          "Implemented lightweight CNN for traffic signal and obstacle classification on edge hardware.",
          "Wired motor controller and ultrasonic sensor array with optimized low-latency Python scripts.",
          "Implemented sensor fusion between ultrasonic telemetry and video feed for fail-safe collision prevention."
        ],
        process: [
          { title: "Problem Analysis & Constraints", description: "Identified frame rate and compute limits on edge hardware, designing an architecture optimized for the Raspberry Pi 4 CPU & camera." },
          { title: "System & Circuit Architecture", description: "Engineered circuit schematics integrating the L298N dual H-bridge motor driver, HC-SR04 ultrasonic sensors, and Pi camera module with dedicated power rails." },
          { title: "Computer Vision Pipeline", description: "Built dynamic OpenCV pipeline: perspective transform (bird's-eye view), adaptive thresholding, and histogram lane-peak detection." },
          { title: "CNN Edge Inference", description: "Trained and deployed a quantized Convolutional Neural Network for real-time traffic sign recognition and dynamic obstacle avoidance." },
          { title: "PID Closed-Loop Control", description: "Implemented a Proportional-Integral-Derivative control loop to provide smooth steering adjustments based on calculated lane deviation." }
        ],
        techStack: ["Raspberry Pi 4", "Python", "OpenCV", "TensorFlow", "CNN", "Hardware GPIO", "Ultrasonic Sensors", "L298N Motor Driver", "NumPy"],
        githubUrl: "https://github.com/Ajmal-6/Automatic-vehicle-using-Raspberry-pi-"
      }
    },
    {
      id: "colorization",
      title: "Image Colorization with Deep Learning",
      subtitle: "Black & White to Realistic Color Restoration",
      year: "2024",
      image: "/images/colorization.png",
      galleryImages: ["/images/bw1.jpg", "/images/bw2.jpg", "/images/bw3.jpeg"],
      description: "Developed a deep learning model to automatically colorize black and white photos using CNN architectures and Transfer Learning. Improved color fidelity by 25% over baseline.",
      tags: ["Deep Learning", "CNN", "Transfer Learning", "TensorFlow", "Computer Vision"],
      githubUrl: "https://github.com/Ajmal-6",
      fullDetails: {
        overview: "A convolutional neural network model trained on historical grayscale photographs to predict plausible color mappings in the CIE Lab color space, synthesizing realistic, vibrant color restorations.",
        highlights: [
          "Converted RGB images to CIE Lab color space to separate luminance channel (L) from chrominance channels (a, b).",
          "Employed deep encoder-decoder CNN with transfer learning from VGG16 for rich semantic feature extraction.",
          "Evaluated output with PSNR and SSIM metrics, achieving an average 25% increase in perceptual realism.",
          "Formulated combined Mean Squared Error and perceptual loss functions to avoid muddy average color artifacts."
        ],
        process: [
          { title: "Dataset Collection & Normalization", description: "Curated diverse photographic datasets of landscapes, human portraits, and architecture, normalized and resized for balanced batch training." },
          { title: "CIE Lab Color Space Conversion", description: "Decoupled lightness (L channel, grayscale input) from color (a and b channels, network targets), simplifying the prediction manifold." },
          { title: "Model Architecture & Transfer Learning", description: "Engineered an encoder-decoder network leveraging pretrained VGG16 weights for high-level semantic feature extraction (foliage, sky, skin)." },
          { title: "Loss Optimization & Model Training", description: "Trained with Adam optimizer with learning rate annealing, penalizing desaturated grayish predictions." },
          { title: "Evaluation & Benchmarking", description: "Assessed quantitative restoration accuracy using Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity Index (SSIM)." }
        ],
        techStack: ["Python", "TensorFlow", "Keras", "OpenCV", "VGG16 Transfer Learning", "CIE Lab Color Space", "Matplotlib", "NumPy"],
        githubUrl: "https://github.com/Ajmal-6"
      }
    }
  ] as Project[],
  education: [
    {
      degree: "B.Tech in Artificial Intelligence & Data Science",
      institution: "Royal College of Engineering, Thrissur (APJ Abdul Kalam Technological University - KTU)",
      period: "2021 — 2025",
      description: "Comprehensive engineering curriculum covering advanced machine learning algorithms, deep neural architectures, data pipelines, and AI systems development."
    },
    {
      degree: "Higher Secondary — Computer Science",
      institution: "Higher Secondary Education Directorate, Kerala",
      period: "2019 — 2021",
      description: "Foundational studies in computer science, structured programming (C++, Python), and mathematical fundamentals."
    }
  ] as Education[],
  achievements: [
    {
      year: "2025",
      title: "KTU Funded Academic Project",
      description: "Selected and funded by APJ Abdul Kalam Technological University for research and implementation of an applied engineering project."
    },
    {
      year: "2025",
      title: "International Technical Conference",
      description: "Participated and presented technical research work in an international conference focusing on emerging AI technologies."
    }
  ]
};
