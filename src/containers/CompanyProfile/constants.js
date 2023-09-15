import { Custom, EmailAddress, GenaralComponent, KeyContact, PhoneNumber, SocialOutpost, Website } from 'components'

export const GENERAL = 'General'
export const ONLINE_PRESENCE = 'OnlinePresence'
export const KEY_PERFORMANCE_INDICATORS = 'KeyPerformanceIndicators'
export const KEY_CONTACT = 'KeyContact'
export const REPUTATION = 'Reputation'
export const AFFILIATIONS = 'Affiliations'
export const ADDRESS = 'Address'
export const LOCATION = 'Location'
export const WEBSITE = 'Website'
export const PHONE_NUMBER = 'PhoneNumber'
export const EMAIL_ADDRESS = 'EmailAddress'
export const SOCIAL_OUT_POST = 'SocialOutpost'
export const FOUNDING_YEAR = 'FoundingYear'
export const EMPLOYEE_COUNT = 'EmployeeCount'
export const ANNUAL_REVENUE = 'AnnualRevenue'
export const AFFILIATION = 'Affiliation'
export const CERTIFICATION = 'Certification'
export const AWARD = 'Award'
export const PRESSRELEASE = 'PressRelease'
export const MENTION = 'Mention'
export const HEADER = 'Header'
export const CUSTOM = 'Custom'

export const NEW_SECTION = 'NewSection'
export const EDIT_SECTION = 'EditSection'
export const DELETE_SECTION = 'DeleteSection'
export const DELETE_SECTION_ITEM = 'DeleteSectionItem'

export const companySizeOptions = [
  { label: 'Unknown', value: 'Unknown' },
  { label: '1-10', value: 'OneToTen' },
  { label: '11-50', value: 'ElevenToFifty' },
  { label: '51-200', value: 'FiftyOneToTwoHundred' },
  { label: '201-500', value: 'TwoHundredOneToFiveHundred' },
  { label: '501-1,000', value: 'FiveHundredOneToThousand' },
  { label: '1,001-5,000', value: 'ThousandOneToFiveThousand' },
  { label: '5,001-10,000', value: 'FiveThousandOneToTenThousand' },
  { label: '10,000 +', value: 'MoreThanTenThousand' },
]

export const companySizeKeys = {
  Unknown: 'Unknown',
  OneToTen: '1-10',
  ElevenToFifty: '11-50',
  FiftyOneToTwoHundred: '51-200',
  TwoHundredOneToFiveHundred: '201-500',
  FiveHundredOneToThousand: '501-1000',
  ThousandOneToFiveThousand: '1,001-5,000',
  FiveThousandOneToTenThousand: '5,001-10,000',
  MoreThanTenThousand: '10,000 +',
}

export const sectionItemsUI = {
  ['EmailAddress']: EmailAddress,
  ['KeyContact']: KeyContact,
  ['PhoneNumber']: PhoneNumber,
  ['Custom']: Custom,
  ['Website']: Website,
  ['AnnualRevenue']: GenaralComponent,
  ['EmployeeCount']: GenaralComponent,
  ['SocialOutpost']: SocialOutpost,
  ['Header']: GenaralComponent,
  ['Address']: GenaralComponent,
  ['FoundingYear']: GenaralComponent,
  ['Affiliation']: GenaralComponent,
  ['Award']: GenaralComponent,
  ['Certification']: GenaralComponent,
  ['Location']: GenaralComponent,
  ['Mention']: GenaralComponent,
  ['PressRelease']: GenaralComponent,
}

export const itemTypes = {
  Address: 'Address',
  Location: 'Location',
  Website: 'Website',
  PhoneNumber: 'Phone Number',
  EmailAddress: 'Email Address',
  SocialOutpost: 'Social Outpost',
  FoundingYear: 'Founding Year',
  EmployeeCount: 'Employee Count',
  AnnualRevenue: 'Annual Revenue',
  Affiliation: 'Affiliation',
  Certification: 'Certification',
  Award: 'Award',
  PressRelease: 'PressRelease',
  Mention: 'Mention',
  KeyContact: 'Key Contact',
  Header: 'Header',
  Custom: 'Custom',
}

export const itemTypesWithLabels = ['Address', 'Website', 'PhoneNumber', 'EmailAddress']

export const industries = (t) => [
  { label: t('Accounting'), value: 'Accounting' },
  { label: t('AirlinesAviation'), value: 'AirlinesAviation' },
  { label: t('AlternativeDisputeResolution'), value: 'AlternativeDisputeResolution' },
  { label: t('AlternativeMedicine'), value: 'AlternativeMedicine' },
  { label: t('Animation'), value: 'Animation' },
  { label: t('ApparelFashion'), value: 'ApparelFashion' },
  { label: t('ArchitecturePlanning'), value: 'ArchitecturePlanning' },
  { label: t('ArtsAndCrafts'), value: 'ArtsAndCrafts' },
  { label: t('Automotive'), value: 'Automotive' },
  { label: t('AviationAerospace'), value: 'AviationAerospace' },
  { label: t('Banking'), value: 'Banking' },
  { label: t('Biotechnology'), value: 'Biotechnology' },
  { label: t('BroadcastMedia'), value: 'BroadcastMedia' },
  { label: t('BuildingMaterials'), value: 'BuildingMaterials' },
  { label: t('BusinessSuppliesAndEquipment'), value: 'BusinessSuppliesAndEquipment' },
  { label: t('CapitalMarkets'), value: 'CapitalMarkets' },
  { label: t('Chemicals'), value: 'Chemicals' },
  { label: t('CivicSocialOrganization'), value: 'CivicSocialOrganization' },
  { label: t('CivilEngineering'), value: 'CivilEngineering' },
  { label: t('CommercialRealEstate'), value: 'CommercialRealEstate' },
  { label: t('ComputerNetworkSecurity'), value: 'ComputerNetworkSecurity' },
  { label: t('ComputerGames'), value: 'ComputerGames' },
  { label: t('ComputerHardware'), value: 'ComputerHardware' },
  { label: t('ComputerNetworking'), value: 'ComputerNetworking' },
  { label: t('ComputerSoftware'), value: 'ComputerSoftware' },
  { label: t('Construction'), value: 'Construction' },
  { label: t('ConsumerElectronics'), value: 'ConsumerElectronics' },
  { label: t('ConsumerGoods'), value: 'ConsumerGoods' },
  { label: t('ConsumerServices'), value: 'ConsumerServices' },
  { label: t('Cosmetics'), value: 'Cosmetics' },
  { label: t('Dairy'), value: 'Dairy' },
  { label: t('DefenseSpace'), value: 'DefenseSpace' },
  { label: t('Design'), value: 'Design' },
  { label: t('ELearning'), value: 'ELearning' },
  { label: t('EducationManagement'), value: 'EducationManagement' },
  { label: t('ElectricalElectronicManufacturing'), value: 'ElectricalElectronicManufacturing' },
  { label: t('Entertainment'), value: 'Entertainment' },
  { label: t('EnvironmentalServices'), value: 'EnvironmentalServices' },
  { label: t('EventsServices'), value: 'EventsServices' },
  { label: t('ExecutiveOffice'), value: 'ExecutiveOffice' },
  { label: t('FacilitiesServices'), value: 'FacilitiesServices' },
  { label: t('Farming'), value: 'Farming' },
  { label: t('FinancialServices'), value: 'FinancialServices' },
  { label: t('FineArt'), value: 'FineArt' },
  { label: t('Fishery'), value: 'Fishery' },
  { label: t('FoodBeverages'), value: 'FoodBeverages' },
  { label: t('FoodProduction'), value: 'FoodProduction' },
  { label: t('FundRaising'), value: 'FundRaising' },
  { label: t('Furniture'), value: 'Furniture' },
  { label: t('GamblingCasinos'), value: 'GamblingCasinos' },
  { label: t('GlassCeramicsConcrete'), value: 'GlassCeramicsConcrete' },
  { label: t('GovernmentAdministration'), value: 'GovernmentAdministration' },
  { label: t('GovernmentRelations'), value: 'GovernmentRelations' },
  { label: t('GraphicDesign'), value: 'GraphicDesign' },
  { label: t('HealthWellnessAndFitness'), value: 'HealthWellnessAndFitness' },
  { label: t('HigherEducation'), value: 'HigherEducation' },
  { label: t('HospitalHealthCare'), value: 'HospitalHealthCare' },
  { label: t('Hospitality'), value: 'Hospitality' },
  { label: t('HumanResources'), value: 'HumanResources' },
  { label: t('ImportAndExport'), value: 'ImportAndExport' },
  { label: t('IndividualFamilyServices'), value: 'IndividualFamilyServices' },
  { label: t('IndustrialAutomation'), value: 'IndustrialAutomation' },
  { label: t('InformationServices'), value: 'InformationServices' },
  { label: t('InformationTechnologyAndServices'), value: 'InformationTechnologyAndServices' },
  { label: t('Insurance'), value: 'Insurance' },
  { label: t('InternationalAffairs'), value: 'InternationalAffairs' },
  { label: t('InternationalTradeAndDevelopment'), value: 'InternationalTradeAndDevelopment' },
  { label: t('Internet'), value: 'Internet' },
  { label: t('InvestmentBanking'), value: 'InvestmentBanking' },
  { label: t('InvestmentManagement'), value: 'InvestmentManagement' },
  { label: t('Judiciary'), value: 'Judiciary' },
  { label: t('LawEnforcement'), value: 'LawEnforcement' },
  { label: t('LawPractice'), value: 'LawPractice' },
  { label: t('LegalServices'), value: 'LegalServices' },
  { label: t('LegislativeOffice'), value: 'LegislativeOffice' },
  { label: t('LeisureTravelTourism'), value: 'LeisureTravelTourism' },
  { label: t('Libraries'), value: 'Libraries' },
  { label: t('LogisticsAndSupplyChain'), value: 'LogisticsAndSupplyChain' },
  { label: t('LuxuryGoodsJewelry'), value: 'LuxuryGoodsJewelry' },
  { label: t('Machinery'), value: 'Machinery' },
  { label: t('ManagementConsulting'), value: 'ManagementConsulting' },
  { label: t('Maritime'), value: 'Maritime' },
  { label: t('MarketResearch'), value: 'MarketResearch' },
  { label: t('MarketingAndAdvertising'), value: 'MarketingAndAdvertising' },
  { label: t('MechanicalOrIndustrialEngineering'), value: 'MechanicalOrIndustrialEngineering' },
  { label: t('MediaProduction'), value: 'MediaProduction' },
  { label: t('MedicalDevices'), value: 'MedicalDevices' },
  { label: t('MedicalPractice'), value: 'MedicalPractice' },
  { label: t('MentalHealthCare'), value: 'MentalHealthCare' },
  { label: t('Military'), value: 'Military' },
  { label: t('MiningMetals'), value: 'MiningMetals' },
  { label: t('MotionPicturesAndFilm'), value: 'MotionPicturesAndFilm' },
  { label: t('MuseumsAndInstitutions'), value: 'MuseumsAndInstitutions' },
  { label: t('Music'), value: 'Music' },
  { label: t('Nanotechnology'), value: 'Nanotechnology' },
  { label: t('Newspapers'), value: 'Newspapers' },
  { label: t('NonProfitOrganizationManagement'), value: 'NonProfitOrganizationManagement' },
  { label: t('NotSpecified'), value: 'NotSpecified' },
  { label: t('OilEnergy'), value: 'OilEnergy' },
  { label: t('OnlineMedia'), value: 'OnlineMedia' },
  { label: t('OutsourcingOffshoring'), value: 'OutsourcingOffshoring' },
  { label: t('PackageFreightDelivery'), value: 'PackageFreightDelivery' },
  { label: t('PackagingAndContainers'), value: 'PackagingAndContainers' },
  { label: t('PaperForestProducts'), value: 'PaperForestProducts' },
  { label: t('PerformingArts'), value: 'PerformingArts' },
  { label: t('Pharmaceuticals'), value: 'Pharmaceuticals' },
  { label: t('Philanthropy'), value: 'Philanthropy' },
  { label: t('Photography'), value: 'Photography' },
  { label: t('Plastics'), value: 'Plastics' },
  { label: t('PoliticalOrganization'), value: 'PoliticalOrganization' },
  { label: t('PrimarySecondaryEducation'), value: 'PrimarySecondaryEducation' },
  { label: t('Printing'), value: 'Printing' },
  { label: t('ProfessionalTrainingCoaching'), value: 'ProfessionalTrainingCoaching' },
  { label: t('ProgramDevelopment'), value: 'ProgramDevelopment' },
  { label: t('PublicPolicy'), value: 'PublicPolicy' },
  { label: t('PublicRelationsAndCommunications'), value: 'PublicRelationsAndCommunications' },
  { label: t('PublicSafety'), value: 'PublicSafety' },
  { label: t('Publishing'), value: 'Publishing' },
  { label: t('RailroadManufacture'), value: 'RailroadManufacture' },
  { label: t('Ranching'), value: 'Ranching' },
  { label: t('RealEstate'), value: 'RealEstate' },
  { label: t('RecreationalFacilitiesAndServices'), value: 'RecreationalFacilitiesAndServices' },
  { label: t('ReligiousInstitutions'), value: 'ReligiousInstitutions' },
  { label: t('RenewablesEnvironment'), value: 'RenewablesEnvironment' },
  { label: t('Research'), value: 'Research' },
  { label: t('Restaurants'), value: 'Restaurants' },
  { label: t('Retail'), value: 'Retail' },
  { label: t('SecurityAndInvestigations'), value: 'SecurityAndInvestigations' },
  { label: t('Semiconductors'), value: 'Semiconductors' },
  { label: t('Shipbuilding'), value: 'Shipbuilding' },
  { label: t('SportingGoods'), value: 'SportingGoods' },
  { label: t('Sports'), value: 'Sports' },
  { label: t('StaffingAndRecruiting'), value: 'StaffingAndRecruiting' },
  { label: t('Supermarkets'), value: 'Supermarkets' },
  { label: t('Telecommunications'), value: 'Telecommunications' },
  { label: t('Textiles'), value: 'Textiles' },
  { label: t('ThinkTanks'), value: 'ThinkTanks' },
  { label: t('Tobacco'), value: 'Tobacco' },
  { label: t('TranslationAndLocalization'), value: 'TranslationAndLocalization' },
  { label: t('TransportationTruckingRailroad'), value: 'TransportationTruckingRailroad' },
  { label: t('Utilities'), value: 'Utilities' },
  { label: t('VentureCapitalPrivateEquity'), value: 'VentureCapitalPrivateEquity' },
  { label: t('Veterinary'), value: 'Veterinary' },
  { label: t('Warehousing'), value: 'Warehousing' },
  { label: t('Wholesale'), value: 'Wholesale' },
  { label: t('WineAndSpirits'), value: 'WineAndSpirits' },
  { label: t('Wireless'), value: 'Wireless' },
  { label: t('WritingAndEditing'), value: 'WritingAndEditing' },
]