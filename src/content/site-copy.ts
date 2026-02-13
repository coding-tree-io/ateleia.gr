export type ServiceItem = {
  title: string;
  description: string;
  imagePlaceholder: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href: string;
};

export const siteCopy = {
  brandName: 'Ατέλεια',
  brandSubtitle: 'Συμβουλευτική και Ψυχοθεραπεία',
  navItems: ['Αρχική', 'Ποιοι Είμαστε', 'Υπηρεσίες', 'FAQ', 'Επικοινωνία'],
  hero: {
    badge: 'Χώρος τέχνης και θεραπείας',
    title: 'Δημιουργία, έκφραση, θεραπεία',
    description:
      'Ένας ήρεμος και ασφαλής χώρος όπου η τέχνη γίνεται γλώσσα σύνδεσης, ενσυναίσθησης και προσωπικής εξέλιξης.',
    primaryCta: 'Κλείσε ραντεβού',
    secondaryCta: 'Μάθε περισσότερα',
  },
  about: {
    title: 'Ποιοι Είμαστε',
    subtitle: 'Μια ανθρώπινη προσέγγιση θεραπείας με επίκεντρο τη σχέση και την αυθεντική έκφραση.',
    paragraphOne:
      'Η θεραπευτική διαδικασία χτίζεται με εμπιστοσύνη, συνέπεια και σεβασμό στη μοναδική διαδρομή κάθε ανθρώπου.',
    paragraphTwo:
      'Η τέχνη λειτουργεί ως εργαλείο επαφής με συναισθήματα και εμπειρίες, χωρίς να απαιτείται προηγούμενη καλλιτεχνική εμπειρία.',
  },
  servicesTitle: 'Υπηρεσίες',
  services: [
    {
      title: 'Ατομικές συνεδρίες',
      description: 'Προσωπικός χώρος έκφρασης με στόχο κατανόηση, σταθερότητα και προσωπική ενδυνάμωση.',
      imagePlaceholder: 'Placeholder εικόνας ατομικής συνεδρίας',
    },
    {
      title: 'Ομαδικές συνεδρίες',
      description: 'Μικρές ομάδες με κοινό πλαίσιο σύνδεσης, αλληλεπίδρασης και δημιουργικής διερεύνησης.',
      imagePlaceholder: 'Placeholder εικόνας ομαδικής συνεδρίας',
    },
    {
      title: 'Online συνεδρίες',
      description: 'Σταθερή θεραπευτική δομή από απόσταση, με ασφάλεια, συνέπεια και πρακτική ευελιξία.',
      imagePlaceholder: 'Placeholder εικόνας online συνεδρίας',
    },
  ] as ServiceItem[],
  faqTitle: 'Συχνές Ερωτήσεις',
  faqDescription: 'Σύντομες απαντήσεις σε ερωτήσεις που συνήθως έρχονται πριν την πρώτη επικοινωνία.',
  faqItems: [
    {
      question: 'Πώς γίνεται η πρώτη συνάντηση;',
      answer:
        'Με μια σύντομη γνωριμία όπου συζητάμε ανάγκες, στόχους και πρακτικές λεπτομέρειες για το πλαίσιο συνεργασίας.',
    },
    {
      question: 'Χρειάζεται εμπειρία στην τέχνη;',
      answer: 'Όχι. Η τέχνη είναι μέσο έκφρασης και επικοινωνίας, όχι αξιολόγηση καλλιτεχνικής ικανότητας.',
    },
    {
      question: 'Μπορούμε να ξεκινήσουμε online;',
      answer: 'Ναι, με σταθερή δομή συνεδριών και σαφές θεραπευτικό πλαίσιο όπως και στις δια ζώσης συναντήσεις.',
    },
  ] as FaqItem[],
  contact: {
    title: 'Επικοινωνία',
    description: 'Στείλτε μήνυμα για να προγραμματίσουμε την πρώτη γνωριμία.',
    formLabels: {
      name: 'Ονοματεπώνυμο',
      email: 'Email',
      phone: 'Τηλέφωνο',
      message: 'Μήνυμα',
      submit: 'Αποστολή αιτήματος',
    },
    infoTitle: 'Στοιχεία επικοινωνίας',
    contactItems: [
      { label: 'Διεύθυνση', value: 'Placeholder διεύθυνσης', href: '#' },
      { label: 'Τηλέφωνο', value: '+30 69X XXX XXXX', href: 'tel:+3069XXXXXXX' },
      { label: 'Email', value: 'hello@ateleia.gr', href: 'mailto:hello@ateleia.gr' },
    ] as ContactItem[],
  },
} as const;
