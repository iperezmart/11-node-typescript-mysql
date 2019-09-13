import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/api', (req: Request, res: Response) => {
    const query = `
        SELECT * FROM test_table
    `;
    
    MySQL.executeQuery(query, (err: any, result: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                data: result
            });
        }
    });
});

router.get('/api/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const escapeId = MySQL.instance.connection.escape(id);
    const query = `
        SELECT * FROM test_table
        WHERE id = ${escapeId}
    `;

    MySQL.executeQuery(query, (err: any, result: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                data: result
            });
        }
    });
});

export default router;
