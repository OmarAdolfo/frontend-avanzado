import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Province, Municipe, Student, Enterprise } from '../models/user.model';
import { CollegeStudy, VocationalStudy, Institution, Category, Grade, TitleStudy } from '../models/study.model';
import { LanguageLevel, LanguageName, Language } from '../models/language.model';
import { Experience } from '../models/experience.model';
import { Offer } from '../models/offer.model';

export class FakeBackendService implements InMemoryDbService {

  createDb() {
    const users: (Student | Enterprise)[] = [
      {
        id: 1,
        username: 'carloscg',
        name: 'Carlos',
        surname: 'Caballero',
        birthdate: '19/11/1984',
        phone: '644039911',
        phone2: '690940321',
        email: 'carlos.caballero@gmail.com',
        password: '1234',
        roles: ['student'],
        documentType: { uid: 1, name: 'NIF/NIE' },
        documentNumber: '26808956H',
        license: 'B1',
        aboutMe: 'LOREM IPSUM',
        otherCompetences: 'LOREM IPSUM',
        address: {
          street: 'Urbanización las Areanas - 45',
          province: { uid: 4, name: 'Cádiz' },
          municipe: { uid: 6, name: 'Chiclana de la Frontera' }
        },
        avatar_hash: 'assets/img/perfil.png',
        studies: [
          {
            id: 1,
            level: { uid: 1, name: 'Ciclo Formativo' },
            category: { uid: 2, name: 'Informática y comunicaciones' },
            institution: {
              uid: 2,
              name: 'IES Politécnico Jesús Marin'
            },
            title: {
              uid: 2,
              name: 'Administracion de sistemas informaticos y redes'
            },
            grade: {
              uid: 3,
              name: 'Ciclo Formativo de Grado Superior'
            },
            date: '30/06/2005',
            dual: false,
            bilingue: true,
            certificate: true
          },
          {
            id: 2,
            institution: {
              uid: 2,
              name: 'IES Politécnico Jesús Marin'
            },
            category: { uid: 2, name: 'Informática y comunicaciones' },
            level: { uid: 1, name: 'Ciclo Formativo' },
            title: { uid: 1, name: 'Técnico Superior en Desarrollo de Aplicaciones Web' },
            grade: { uid: 3, name: 'Ciclo Formativo de Grado Superior' },
            date: '30/06/2007',
            dual: true,
            bilingue: false,
            certificate: false
          }
        ],
        languages: [
          {
            id: 1,
            level: { uid: 5, name: 'C1' },
            name: { id: 1, name: 'Inglés' },
            date: '30/06/2005'
          },
          {
            id: 2,
            level: { uid: 4, name: 'B2' },
            name: { id: 2, name: 'Francés' },
            date: '30/06/1998'
          }
        ],
        offers: [
          {
            id: 1,
            company: {
              uid: 33,
              name: 'Coritel'
            },
            job: {
              uid: 1,
              name: 'Programador Jr Java',
              description: 'Programación y prueba unitaria en Java'
            },
            province: { uid: 1, name: 'Málaga' },
            municipe: { uid: 7, name: 'Estepona' },
            date: '21/09/2006',
            category: { uid: 2, name: 'Informática y Comunicaciones' },
            title: [
              { uid: 1, name: 'Técnico Superior en Desarrollo de Aplicaciones Web' },
              { uid: 4, name: 'Desarrollo Aplicaciones Multiplataforma' }
            ]
          }
        ],
        experiencies: [
          {
            id: 1,
            company: 'Suma',
            dateInitial: '20/01/2010',
            dateEnd: '20/03/2010',
            position: 'Junior',
            tasks: 'Lore ipsum'
          },
          {
            id: 2,
            company: 'Indra',
            dateInitial: '25/02/2012',
            dateEnd: '25/06/2012',
            position: 'Ingeniero',
            tasks: 'Lore ipsum'
          }
        ],
        configuration: {
          languageName: { id: -1, name: '' },
          notifications: []
        }
      },
      {
        id: 2,
        username: 'arte',
        password: 'arte',
        name: 'Paco',
        surname: 'Álvarez',
        phone: '123456789',
        email: 'arte@gmail.com',
        documentNumber: 'W1876112B0',
        address: {
          street: 'Urbanización las Areanas - 45',
          province: { uid: 4, name: 'Cádiz' },
          municipe: { uid: 6, name: 'Chiclana de la Frontera' }
        },
        offers: [
          {
            id: 1,
            company: {
              uid: 33,
              name: 'Coritel'
            },
            job: {
              uid: 1,
              name: 'Programador Jr Java',
              description: 'Programación y prueba unitaria en Java'
            },
            province: { uid: 1, name: 'Málaga' },
            municipe: { uid: 7, name: 'Estepona' },
            date: '21/09/2006',
            category: { uid: 2, name: 'Informática y Comunicaciones' },
            title: [
              { uid: 1, name: 'Técnico Superior en Desarrollo de Aplicaciones Web' },
              { uid: 4, name: 'Desarrollo Aplicaciones Multiplataforma' }
            ]
          }
        ],
        roles: ['company'],
        comercialName: 'Arte Consultores',
        businessName: 'Arte Consultores Tecnológicos S.L.',
        url: 'www.arte-consultores.com',
        configuration: {
          languageName: { id: -1, name: '' },
          notifications: []
        }
      }
    ];

    const offers: Offer[] = [
      {
        id: 1,
        company: {
          uid: 33,
          name: 'Coritel'
        },
        job: {
          uid: 1,
          name: 'Programador Jr Java',
          description: 'Programación y prueba unitaria en Java'
        },
        province: { uid: 1, name: 'Málaga' },
        municipe: { uid: 7, name: 'Estepona' },
        date: '21/09/2006',
        category: { uid: 2, name: 'Informática y Comunicaciones' },
        title: [
          { uid: 1, name: 'Técnico Superior en Desarrollo de Aplicaciones Web' },
          { uid: 4, name: 'Desarrollo Aplicaciones Multiplataforma' }
        ]
      },
      {
        id: 2,
        company: {
          uid: 33,
          name: 'Coritel'
        },
        job: {
          uid: 2,
          name: 'Comercial',
          description:
            'Relaciones con los clientes y atención a las redes sociales.'
        },
        province: { uid: 1, name: 'Málaga' },
        municipe: { uid: 8, name: 'Campanillas (PTA)' },
        date: '21/09/2016',
        category: { uid: 4, name: 'Comercio y Marketing' },
        title: [{ uid: 5, name: 'Gestión Comercial y Empresarial' }, {
          uid: 2,
          name: 'Administracion de sistemas informaticos y redes'
        }]
      },
      {
        id: 3,
        company: {
          uid: 33,
          name: 'Coritel'
        },
        job: {
          uid: 3,
          name: 'Analista Programador Java',
          description:
            'Análisis funcional y diseño técnico/detallado de componentes'
        },
        province: { uid: 5, name: 'Granada' },
        municipe: { uid: 9, name: 'Motril' },
        date: '11/07/2016',
        category: { uid: 2, name: 'Informática y Comunicaciones' },
        title: [{ uid: 4, name: 'Desarrollo Aplicaciones Multiplataforma' }]
      },
      {
        id: 4,
        company: {
          uid: 35,
          name: 'Indra'
        },
        job: {
          uid: 4,
          name: 'Administrativo',
          description: 'Gestión de cartera de clientes.'
        },
        province: { uid: 2, name: 'Sevilla' },
        municipe: { uid: 10, name: 'Osuna' },
        date: '01/12/2015',
        category: { uid: 5, name: 'Administración y Gestión' },
        title: [{ uid: 6, name: 'Empresariales' }]
      }
    ];

    const provinces: Province[] = [
      { uid: 1, name: 'Málaga' },
      { uid: 2, name: 'Sevilla' },
      { uid: 4, name: 'Cádiz' },
      { uid: 5, name: 'Granada' }
    ]

    const municipes: Municipe[] = [
      { uid: 6, name: 'Chiclana de la Frontera' },
      { uid: 7, name: 'Estepona' },
      { uid: 8, name: 'Campanillas (PTA)' },
      { uid: 9, name: 'Motril' },
      { uid: 10, name: 'Osuna' }
    ]

    const studies: (VocationalStudy | CollegeStudy)[] = [
      {
        id: 1,
        level: { uid: 1, name: 'Ciclo Formativo' },
        category: { uid: 2, name: 'Informática y comunicaciones' },
        institution: {
          uid: 2,
          name: 'IES Politécnico Jesús Marin'
        },
        title: {
          uid: 2,
          name: 'Administracion de sistemas informaticos y redes'
        },
        grade: {
          uid: 3,
          name: 'Ciclo Formativo de Grado Superior'
        },
        date: '30/06/2005',
        dual: false,
        bilingue: true,
        certificate: true
      },
      {
        id: 2,
        institution: {
          uid: 2,
          name: 'IES Politécnico Jesús Marin'
        },
        category: { uid: 2, name: 'Informática y comunicaciones' },
        level: { uid: 1, name: 'Ciclo Formativo' },
        title: {
          uid: 1,
          name: 'Técnico Superior en Desarrollo de Aplicaciones Web'
        },
        grade: { uid: 3, name: 'Ciclo Formativo de Grado Superior' },
        date: '30/06/2007',
        dual: true,
        bilingue: false,
        certificate: false
      }
    ];

    const institutions: Institution[] = [
      {
        uid: 1,
        name: 'IES César Manrique'
      },
      {
        uid: 2,
        name: 'IES Politécnico Jesús Marin'
      }
    ];

    const categories: Category[] = [
      { uid: 2, name: 'Informática y comunicaciones' },
      { uid: 4, name: 'Comercio y Marketing' },
      { uid: 5, name: 'Administración y Gestión' }
    ];

    const grades: Grade[] = [
      { uid: 1, name: 'Ciclo Formativo de FP Básica' },
      { uid: 2, name: 'Ciclo Formativo de Grado Medio' },
      { uid: 3, name: 'Ciclo Formativo de Grado Superior' }
    ];

    const titles: TitleStudy[] = [
      { uid: 1, name: 'Técnico Superior en Desarrollo de Aplicaciones Web' },
      { uid: 2, name: 'Administracion de sistemas informaticos y redes' },
      { uid: 4, name: 'Desarrollo Aplicaciones Multiplataforma' },
      { uid: 5, name: 'Gestión Comercial y Empresarial' },
      { uid: 6, name: 'Empresariales' }
    ];

    const languageLevels: LanguageLevel[] = [
      { uid: 1, name: 'A1' },
      { uid: 2, name: 'A2' },
      { uid: 3, name: 'B1' },
      { uid: 4, name: 'B2' },
      { uid: 5, name: 'C1' },
      { uid: 6, name: 'C2' }
    ];

    const languageNames: LanguageName[] = [
      { id: 1, name: 'Inglés' },
      { id: 2, name: 'Francés' },
      { id: 3, name: 'Español' }
    ];

    const languages: Language[] = [
      {
        id: 1,
        level: { uid: 5, name: 'C1' },
        name: { id: 1, name: 'Inglés' },
        date: '30/06/2005'
      },
      {
        id: 2,
        level: { uid: 4, name: 'B2' },
        name: { id: 2, name: 'Francés' },
        date: '30/06/1998'
      }
    ];

    const experiencies: Experience[] = [
      {
        id: 1,
        company: 'Suma',
        dateInitial: '1548320228',
        dateEnd: '1548320228',
        position: 'Junior',
        tasks: 'Lore ipsum'
      },
      {
        id: 2,
        company: 'Indra',
        dateInitial: '1548320228',
        dateEnd: '1548320228',
        position: 'Ingeniero',
        tasks: 'Lore ipsum'
      }
    ];

    return {
      users,
      offers,
      provinces,
      municipes,
      studies,
      institutions,
      categories,
      grades,
      titles,
      languageLevels,
      languageNames,
      languages,
      experiencies
    };

  }
}