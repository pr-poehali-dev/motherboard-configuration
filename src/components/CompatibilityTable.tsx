import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CompatibilityData {
  motherboard: string;
  manufacturer: string;
  socket: string;
  chipset: string;
  supportedCpus: string[];
  maxRam: string;
  ramSlots: number;
  formFactor: string;
  price?: string;
  features: string[];
}

const compatibilityData: CompatibilityData[] = [
  {
    motherboard: "ASUS H110M-K",
    manufacturer: "ASUS",
    socket: "LGA1151",
    chipset: "H110",
    supportedCpus: ["Intel Core i3-6100", "Intel Core i5-6400", "Intel Core i5-6500", "Intel Core i7-6700"],
    maxRam: "32GB",
    ramSlots: 2,
    formFactor: "Micro-ATX",
    price: "~3500₽",
    features: ["USB 3.0", "SATA 6Gb/s", "PCIe 3.0"]
  },
  {
    motherboard: "MSI H110M PRO-VD",
    manufacturer: "MSI",
    socket: "LGA1151",
    chipset: "H110",
    supportedCpus: ["Intel Core i3-6100", "Intel Core i5-6400", "Intel Core i5-6500", "Intel Core i7-6700", "Intel Pentium G4400"],
    maxRam: "32GB",
    ramSlots: 2,
    formFactor: "Micro-ATX",
    price: "~3200₽",
    features: ["USB 3.0", "SATA 6Gb/s", "DDR4-2133"]
  },
  {
    motherboard: "Gigabyte GA-H110M-S2H",
    manufacturer: "Gigabyte",
    socket: "LGA1151",
    chipset: "H110",
    supportedCpus: ["Intel Core i3-6100", "Intel Core i5-6400", "Intel Core i5-6500", "Intel Core i7-6700K", "Intel Pentium G4500"],
    maxRam: "32GB",
    ramSlots: 2,
    formFactor: "Micro-ATX",
    price: "~3800₽",
    features: ["USB 3.0", "HDMI", "DVI-D", "VGA"]
  },
  {
    motherboard: "ASRock H110M-DGS",
    manufacturer: "ASRock",
    socket: "LGA1151",
    chipset: "H110",
    supportedCpus: ["Intel Core i3-6300", "Intel Core i5-6600", "Intel Core i7-6700", "Intel Celeron G3900"],
    maxRam: "32GB",
    ramSlots: 2,
    formFactor: "Micro-ATX",
    price: "~2900₽",
    features: ["USB 3.0", "SATA 6Gb/s", "Full Spike Protection"]
  }
];

export default function CompatibilityTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const manufacturers = ['all', ...Array.from(new Set(compatibilityData.map(item => item.manufacturer)))];

  const filteredData = compatibilityData.filter(item => {
    const matchesSearch = item.motherboard.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supportedCpus.some(cpu => cpu.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesManufacturer = selectedManufacturer === 'all' || item.manufacturer === selectedManufacturer;
    return matchesSearch && matchesManufacturer;
  });

  const toggleRow = (motherboard: string) => {
    setExpandedRow(expandedRow === motherboard ? null : motherboard);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Таблица совместимости</h1>
          <p className="text-xl text-muted-foreground">Материнские платы и процессоры для чипсета H110</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Search" size={24} />
              Поиск и фильтры
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Поиск по названию материнской платы или процессора..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                {manufacturers.map((manufacturer) => (
                  <Button
                    key={manufacturer}
                    variant={selectedManufacturer === manufacturer ? "default" : "outline"}
                    onClick={() => setSelectedManufacturer(manufacturer)}
                    className="capitalize"
                  >
                    {manufacturer === 'all' ? 'Все' : manufacturer}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Cpu" size={24} />
              Совместимость H110 чипсета
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Материнская плата</TableHead>
                    <TableHead>Производитель</TableHead>
                    <TableHead>Сокет</TableHead>
                    <TableHead>Макс. ОЗУ</TableHead>
                    <TableHead>Форм-фактор</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Детали</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <>
                      <TableRow key={item.motherboard} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{item.motherboard}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{item.manufacturer}</Badge>
                        </TableCell>
                        <TableCell>{item.socket}</TableCell>
                        <TableCell>{item.maxRam}</TableCell>
                        <TableCell>{item.formFactor}</TableCell>
                        <TableCell className="text-primary font-semibold">{item.price}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRow(item.motherboard)}
                            className="flex items-center gap-1"
                          >
                            <Icon 
                              name={expandedRow === item.motherboard ? "ChevronUp" : "ChevronDown"} 
                              size={16} 
                            />
                            {expandedRow === item.motherboard ? "Скрыть" : "Показать"}
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedRow === item.motherboard && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-muted/30">
                            <div className="p-4 space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <Icon name="Cpu" size={16} />
                                  Поддерживаемые процессоры:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.supportedCpus.map((cpu) => (
                                    <Badge key={cpu} variant="outline">{cpu}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <Icon name="Settings" size={16} />
                                  Особенности:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.features.map((feature) => (
                                    <Badge key={feature} variant="secondary">{feature}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Слоты ОЗУ:</span>
                                  <p>{item.ramSlots}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Чипсет:</span>
                                  <p>{item.chipset}</p>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={24} />
              Информация о чипсете H110
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold">Основные характеристики:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    Сокет: LGA1151
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    Поддержка DDR4-2133
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    PCIe 3.0 поддержка
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    USB 3.0 контроллер
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Совместимые поколения:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Icon name="Cpu" size={16} className="text-primary" />
                    Intel 6th Gen (Skylake)
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Cpu" size={16} className="text-primary" />
                    Intel Core i3/i5/i7
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Cpu" size={16} className="text-primary" />
                    Intel Pentium/Celeron
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}