import { IPatient } from "../../patient/interfaces/patient.interface";
import { PatientRepository } from "../../patient/repositories/patient.repository";
import { IAttendance } from "../interfaces/attendance.interface";
import { AttendanceRepository } from "../repositories/attendance.repository";
import PDFDocument from 'pdfkit';

export class GenerateAttendanceReportService {
    constructor(
        private attendanceRepository: AttendanceRepository,
        private patientRepository: PatientRepository
    ) { }

    async execute(attendanceId: string, doctorId: string) {
        const attendance = await this.attendanceRepository.findById(attendanceId, doctorId);

        if (!attendance) {
            throw new Error('Atendimento não encontrado');
        }

        if (attendance.doctorId.toString() !== doctorId) {
            throw new Error('Não autorizado');
        }

        const patient = await this.patientRepository.findById(
            attendance.patientId.toString()
        );

        if (!patient) {
            throw new Error('Paciente não encontrado');
        }

        return this.generatePdf(attendance, patient);
    }

    private generatePdf(
        attendance: IAttendance,
        patient: IPatient
    ): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({
                size: 'A4',
                margins: {
                    top: 90,
                    bottom: 70,
                    left: 95,
                    right: 95,
                },
            });
            const chunks: Buffer[] = [];

            const primaryColor = '#0B3D6E';
            const textColor = '#111111';

            doc.on('data', (chunk) => chunks.push(chunk));

            doc.on('end', () => {
                resolve(Buffer.concat(chunks));
            });

            doc.on('error', reject);

            doc
                .fillColor(primaryColor)
                .font('Helvetica-Bold')
                .fontSize(16)
                .text('Prontuário Médico');

            doc
                .moveDown(0.3)
                .fillColor(textColor)
                .font('Helvetica')
                .fontSize(10.5)
                .text(`Data do atendimento: ${this.formatDate(attendance.date)}`);

            this.addSectionTitle(doc, 'Dados pessoais', primaryColor);

            doc
                .fillColor(textColor)
                .font('Helvetica')
                .fontSize(10.5)
                .text(`Nome: ${patient.name}`)
                .text(`Data de nascimento: ${this.formatBirthDate(patient.birthDate)}`)
                .text(`Sexo: ${patient.sex}`);

            this.addSectionTitle(doc, 'Anamnese', primaryColor);

            doc
                .fillColor(textColor)
                .font('Helvetica')
                .fontSize(10.5)
                .text(attendance.anamnesis);

            this.addSectionTitle(doc, 'Diagnóstico', primaryColor);

            doc
                .fillColor(textColor)
                .font('Helvetica')
                .fontSize(10.5)
                .text(attendance.diagnosis);

            this.addSectionTitle(doc, 'Conduta', primaryColor);

            doc
                .fillColor(textColor)
                .font('Helvetica')
                .fontSize(10.5)
                .text(attendance.conduct);

            if (attendance.prescription) {
                this.addSectionTitle(doc, 'Prescrição', primaryColor);

                doc
                    .fillColor(textColor)
                    .font('Helvetica')
                    .fontSize(10.5)
                    .text(attendance.prescription);
            }

            if (attendance.observations) {
                this.addSectionTitle(doc, 'Observações', primaryColor);

                doc
                    .fillColor(textColor)
                    .font('Helvetica')
                    .fontSize(10.5)
                    .text(attendance.observations);
            }

            doc.end();
        });
    }

    private formatDate(date: string) {
        const parsedDate = new Date(date);

        return new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
            .format(parsedDate)
            .replace(',', ' às');
    }

    private formatBirthDate(date: string) {
        const parsedDate = new Date(date);

        return new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'UTC',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(parsedDate);
    }

    private addSectionTitle(
        doc: PDFKit.PDFDocument,
        title: string,
        color: string
    ) {
        doc
            .moveDown(1.2)
            .fillColor(color)
            .font('Helvetica-Bold')
            .fontSize(12)
            .text(title);

        doc.moveDown(0.35);
    }
}