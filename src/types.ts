export type ServiceType = 'hourly' | 'adoption' | 'foster';

export interface HealthStatus {
  vaccinated: boolean; // 是否已接种疫苗
  vaccineDoses: number; // 疫苗针数 (如 3针)
  dewormed: boolean; // 是否已驱虫
  neutered: boolean; // 是否已绝育
  checkupPassed: boolean; // 体检合格
  notes?: string;
}

export interface PublisherInfo {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  wechat?: string;
  verified: boolean;
  isCurrentUser?: boolean;
}

export interface CatInfo {
  id: string;
  name: string;
  breed: string; // 品种: 英国短毛猫, 金渐层, 布偶猫, 橘猫等
  age: string; // 年龄: 3个月, 1岁
  gender: 'boy' | 'girl'; // 性别: 公 (弟弟) / 母 (妹妹)
  imageUrl: string;
  additionalImages?: string[];
  priceType: ServiceType;
  pricePerHour?: number; // 每小时服务费
  adoptionFee?: number; // 领养费 (0 为免费领养)
  tags: string[];
  city: string;
  district: string;
  distance?: string;
  health: HealthStatus;
  description: string;
  temperament: string[]; // 性格特征
  publisher: PublisherInfo;
  status: 'available' | 'booked' | 'adopted';
  likeCount: number;
  viewCount: number;
  createdAt: number;
}

export interface AppointmentOrder {
  id: string;
  catId: string;
  catName: string;
  catBreed: string;
  catImage: string;
  pricePerHour: number;
  serviceDate: string;
  timeSlot: string;
  durationHours: number;
  totalPrice: number;
  contactName: string;
  contactPhone: string;
  address: string;
  notes?: string;
  insuranceIncluded: boolean;
  status: 'pending_delivery' | 'delivering' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: number;
}

export type TabType = 'home' | 'cats' | 'publish' | 'orders' | 'profile';
