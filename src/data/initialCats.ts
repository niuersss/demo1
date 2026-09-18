import { CatInfo, AppointmentOrder } from '../types';

export const INITIAL_CATS: CatInfo[] = [
  {
    id: 'cat-1',
    name: '云铮',
    breed: '中华田园橘白猫',
    age: '5个月',
    gender: 'boy',
    imageUrl: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80'
    ],
    priceType: 'hourly',
    pricePerHour: 50,
    tags: ['活泼粘人', '呼噜机器', '新手友好', '疫苗齐全'],
    city: '北京市',
    district: '朝阳区三里屯',
    distance: '0.8km',
    health: {
      vaccinated: true,
      vaccineDoses: 3,
      dewormed: true,
      neutered: false,
      checkupPassed: true,
      notes: '猫三联3针已完成，狂犬已打，无耳螨无猫藓，活泼健康。'
    },
    description: '云铮是一只特别通人性的暖萌橘白小帅哥！非常喜欢贴贴蹭手，一抱就疯狂开动拖拉机式呼噜。会自己用猫砂盆，不挑食，最喜欢被挠下巴。',
    temperament: ['超级亲人', '爱叫唤撒娇', '随便摸肚子', '适应力强'],
    publisher: {
      id: 'pub-1',
      name: '橘子酱猫舍',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '13800138000',
      wechat: 'cat_home_01',
      verified: true
    },
    status: 'available',
    likeCount: 184,
    viewCount: 1320,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2
  },
  {
    id: 'cat-2',
    name: '糖果',
    breed: '金渐层NY12',
    age: '3个月',
    gender: 'girl',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80'
    ],
    priceType: 'hourly',
    pricePerHour: 99,
    tags: ['大圆脸', '软糯小包子', '绿宝石眼', '不抓人'],
    city: '北京市',
    district: '海淀区中关村',
    distance: '1.5km',
    health: {
      vaccinated: true,
      vaccineDoses: 2,
      dewormed: true,
      neutered: false,
      checkupPassed: true,
      notes: '已做全套抗原检测及核酸PCR筛查，指标全部健康合格。'
    },
    description: '糖果就像她的名字一样甜！毛茸茸的小汤圆，圆滚滚的包子脸和翠绿大眼睛。性格温顺软萌，抱在怀里像一块热乎乎的棉花糖，拍照非常上镜。',
    temperament: ['安静软萌', '爱抱抱', '乖巧听话', '治愈系'],
    publisher: {
      id: 'pub-2',
      name: '萌宠守护官-小琳',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      phone: '13911223344',
      wechat: 'sweet_kitten_lynn',
      verified: true
    },
    status: 'available',
    likeCount: 326,
    viewCount: 2680,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1
  },
  {
    id: 'cat-3',
    name: '团子',
    breed: '英国短毛猫(蓝白)',
    age: '6个月',
    gender: 'boy',
    imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=600&q=80'
    ],
    priceType: 'hourly',
    pricePerHour: 60,
    tags: ['五粉正八', '大腮帮子', '乖巧安静', '已绝育'],
    city: '北京市',
    district: '朝阳区望京',
    distance: '2.1km',
    health: {
      vaccinated: true,
      vaccineDoses: 3,
      dewormed: true,
      neutered: true,
      checkupPassed: true,
      notes: '疫苗齐全，体内外驱虫已完成，身体强壮底子好。'
    },
    description: '正八字开脸、粉嘟嘟的鼻头和小肉垫。平时是个高冷安静的小少爷，但只要你拿出逗猫棒或者冻干，立马变成粘人精。',
    temperament: ['佛系温和', '不拆家', '陪伴感强', '喜欢被梳毛'],
    publisher: {
      id: 'pub-3',
      name: '喵星驿站',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      phone: '13766778899',
      wechat: 'miaoxing_station',
      verified: true
    },
    status: 'available',
    likeCount: 198,
    viewCount: 1450,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3
  },
  {
    id: 'cat-4',
    name: '泡芙',
    breed: '双色布偶猫',
    age: '8个月',
    gender: 'girl',
    imageUrl: 'https://images.unsplash.com/photo-1513360309081-38f076278f9c?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80'
    ],
    priceType: 'hourly',
    pricePerHour: 85,
    tags: ['仙女猫', '蓝宝石大眼', '任抱任揉', '极其温顺'],
    city: '北京市',
    district: '西城区金融街',
    distance: '3.4km',
    health: {
      vaccinated: true,
      vaccineDoses: 3,
      dewormed: true,
      neutered: true,
      checkupPassed: true,
      notes: '拥有完整纯种血统证书，定点医院全面体检，心肌HCM基因检测阴性。'
    },
    description: '行走的小仙女，毛量极其丰厚松软，像丝绸一样滑顺。脾气极好，任抱任摸，小爪子永远收得好好的，适合喜欢静静抱猫看书追剧的朋友。',
    temperament: ['极度温顺', '人偶体质', '粘人乖顺', '脾气超好'],
    publisher: {
      id: 'pub-4',
      name: '仙女布偶乐园',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      phone: '13612345678',
      wechat: 'ragdoll_fairy',
      verified: true
    },
    status: 'available',
    likeCount: 412,
    viewCount: 3890,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4
  },
  {
    id: 'cat-5',
    name: '奶酪',
    breed: '美短加白',
    age: '4个月',
    gender: 'boy',
    imageUrl: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=600&q=80',
    priceType: 'hourly',
    pricePerHour: 55,
    tags: ['经典川字纹', '精力充沛', '爱玩逗猫棒', '健美体魄'],
    city: '北京市',
    district: '丰台区科技园',
    distance: '2.8km',
    health: {
      vaccinated: true,
      vaccineDoses: 2,
      dewormed: true,
      neutered: false,
      checkupPassed: true,
      notes: '疫苗接种中，身体各项指标优秀，骨量结实。'
    },
    description: '活泼好动的美短小健将！身上的对称川字纹路非常漂亮，眼神灵动。特别喜欢互动玩具，能带给你满满的活力与欢乐！',
    temperament: ['活泼外向', '好奇宝宝', '爱玩爱闹', '互动性强'],
    publisher: {
      id: 'pub-5',
      name: '猫言猫语工作室',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      phone: '13598765432',
      wechat: 'cat_studio_bj',
      verified: true
    },
    status: 'available',
    likeCount: 147,
    viewCount: 920,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5
  },
  {
    id: 'cat-6',
    name: '大白',
    breed: '山东临清狮子猫',
    age: '1岁',
    gender: 'boy',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80',
    priceType: 'adoption',
    adoptionFee: 0,
    tags: ['爱心领养', '异瞳鸳鸯眼', '长毛威武', '找有缘家庭'],
    city: '北京市',
    district: '通州区梨园',
    distance: '4.2km',
    health: {
      vaccinated: true,
      vaccineDoses: 3,
      dewormed: true,
      neutered: true,
      checkupPassed: true,
      notes: '已绝育疫苗齐全，定期体内外驱虫，健康档案完整。'
    },
    description: '一蓝一黄的绝美鸳鸯异瞳！因为原主人工作出国调动，希望为它寻找一个科学养宠、封窗封阳台、有爱心陪伴的温暖新家。免费领养，需签署领养协议并接受定期视频回访。',
    temperament: ['懂事听话', '沉稳不吵', '极度亲近人', '感恩有爱'],
    publisher: {
      id: 'pub-6',
      name: '首都流浪动物爱心汇',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80',
      phone: '13123456789',
      wechat: 'animal_rescue_bj',
      verified: true
    },
    status: 'available',
    likeCount: 512,
    viewCount: 4200,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6
  }
];

export const INITIAL_ORDERS: AppointmentOrder[] = [
  {
    id: 'ord-2026091801',
    catId: 'cat-2',
    catName: '糖果',
    catBreed: '金渐层NY12',
    catImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
    pricePerHour: 99,
    serviceDate: '2026-09-19',
    timeSlot: '14:00 - 16:00',
    durationHours: 2,
    totalPrice: 198,
    contactName: '林小姐',
    contactPhone: '138****8899',
    address: '北京市海淀区中关村南大街1号院3号楼802',
    notes: '家里有准备温水和小玩具，希望送达前电话联系。',
    insuranceIncluded: true,
    status: 'pending_delivery',
    createdAt: Date.now() - 1000 * 60 * 60 * 5
  }
];

export const PRESET_CAT_AVATARS = [
  {
    name: '萌宠橘白',
    url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '金渐层宝贝',
    url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '优雅英短蓝白',
    url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '仙气布偶',
    url: 'https://images.unsplash.com/photo-1513360309081-38f076278f9c?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '美短小老虎',
    url: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '黑白奶牛猫',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '纯白异瞳',
    url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: '三花软妹',
    url: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=600&q=80'
  }
];

export const POPULAR_BREEDS = [
  '英国短毛猫',
  '金渐层',
  '银渐层',
  '布偶猫',
  '美国短毛猫',
  '中华田园橘猫',
  '狸花猫',
  '奶牛猫',
  '暹罗猫',
  '波斯猫',
  '狮子猫',
  '其它品种'
];

export const COMMON_TAGS = [
  '活泼粘人',
  '温顺安静',
  '呼噜怪',
  '随便揉捏',
  '会用猫砂',
  '不拆家',
  '喜欢抱抱',
  '新手推荐',
  '已打疫苗',
  '已做绝育',
  '无攻击性',
  '爱吃冻干'
];
