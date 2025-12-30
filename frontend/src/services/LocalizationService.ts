export type SupportedLanguage = 'it' | 'en';

interface Translations {
    menu: {
        startAR: string;
        startGame: string;
        exitAR: string;
        language: string;
        tagline: string;
    };
    game: {
        question: string;
        gameOver: string;
        gameOverMessage: string;
        victory: string;
        victoryMessage: string;
        restart: string;
        newGame: string;
        mainMenu: string;
    };
    errors: {
        connectionError: string;
        arNotSupported: string;
        xrNotSupported: string;
    };
}

const translations: Record<SupportedLanguage, Translations> = {
    it: {
        menu: {
            startAR: 'Entra in AR',
            startGame: 'Inizia Partita',
            exitAR: 'Esci da AR',
            language: '🌐 Lingua',
            tagline: 'Sfida la tua mente in realtà aumentata'
        },
        game: {
            question: 'Domanda',
            gameOver: 'GAME OVER',
            gameOverMessage: 'Hai risposto in modo errato.\nVuoi riprovare?',
            victory: 'COMPLIMENTI!',
            victoryMessage: 'Hai completato tutte le domande!',
            restart: 'Riprova',
            newGame: 'Nuova Partita',
            mainMenu: 'Menu Principale'
        },
        errors: {
            connectionError: 'Errore di connessione.',
            arNotSupported: 'AR non supportata su questo dispositivo',
            xrNotSupported: 'WebXR non supportato su questo browser'
        }
    },
    en: {
        menu: {
            startAR: 'Enter AR',
            startGame: 'Start Game',
            exitAR: 'Exit AR',
            language: '🌐 Language',
            tagline: 'Challenge your mind in augmented reality'
        },
        game: {
            question: 'Question',
            gameOver: 'GAME OVER',
            gameOverMessage: 'You answered incorrectly.\nWould you like to try again?',
            victory: 'CONGRATULATIONS!',
            victoryMessage: 'You completed all the questions!',
            restart: 'Restart',
            newGame: 'New Game',
            mainMenu: 'Main Menu'
        },
        errors: {
            connectionError: 'Connection error.',
            arNotSupported: 'AR not supported on this device',
            xrNotSupported: 'WebXR not supported on this browser'
        }
    }
};

export class LocalizationService {
    private static instance: LocalizationService;
    private currentLanguage: SupportedLanguage = 'it';
    private listeners: Array<() => void> = [];

    private constructor() {
        // Load saved language from localStorage
        const saved = localStorage.getItem('brainArena_language') as SupportedLanguage | null;
        if (saved && (saved === 'it' || saved === 'en')) {
            this.currentLanguage = saved;
        }
    }

    public static getInstance(): LocalizationService {
        if (!LocalizationService.instance) {
            LocalizationService.instance = new LocalizationService();
        }
        return LocalizationService.instance;
    }

    public getCurrentLanguage(): SupportedLanguage {
        return this.currentLanguage;
    }

    public setLanguage(lang: SupportedLanguage): void {
        if (this.currentLanguage === lang) return;
        this.currentLanguage = lang;
        localStorage.setItem('brainArena_language', lang);
        this.notifyListeners();
    }

    public toggleLanguage(): void {
        this.setLanguage(this.currentLanguage === 'it' ? 'en' : 'it');
    }

    public getTranslations(): Translations {
        return translations[this.currentLanguage];
    }

    public onLanguageChange(callback: () => void): void {
        this.listeners.push(callback);
    }

    private notifyListeners(): void {
        this.listeners.forEach(callback => callback());
    }
}